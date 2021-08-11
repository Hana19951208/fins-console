<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane"
                 class="tags-view-wrapper">
      <div class="tags-view-group">
        <router-link v-for="tag in visitedViews"
                     ref="tag"
                     :class="isActive(tag)?'active':''"
                     :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                     :key="tag.path"
                     tag="span"
                     class="tags-view-item"
                     @click.middle.native="closeSelectedTag(tag)"
                     @contextmenu.prevent.native="openMenu(tag,$event)">
          {{ generateTitle(tag.title) }}
          <span v-if="!tag.meta.affix"
                class="el-icon-close"
                @click.prevent.stop="closeSelectedTag(tag)" />
        </router-link>
      </div>
    </scroll-pane>
    <ul v-show="visible"
        :style="{left:left+'px',top:top+'px'}"
        class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">{{ $t('tagsView.refresh') }}</li>
      <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)"
          @click="closeSelectedTag(selectedTag)">{{
      $t('tagsView.close') }}</li>
      <li @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>
      <li @click="closeAllTags(selectedTag)">{{ $t('tagsView.closeAll') }}</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import { generateTitle } from '@/utils/i18n'
import path from 'path'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routers() {
      return this.$store.state.permission.routers
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    generateTitle, // generateTitle by vue-i18n
    isActive(route) {
      return (route.path === this.$route.path) || (route.path === this.$route.query.$parent_path)
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    filterRouters(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.url) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterRouters(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routers)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      const $parent_path = this.$route.query.$parent_path

      if (name) {
        this.$store.dispatch('addView', this.$route)
      }

      if ($parent_path) {
        const $parent_router = this.filterRouters(this.routers).find(item => item.path === $parent_path)
        if ($parent_router) {
          this.$store.dispatch('addView', $parent_router)
        }
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        if (this.isActive(view) || visitedViews.length === 1) {
          this.toLastView(visitedViews)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews)
      })
    },
    toLastView(visitedViews) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        // You can set another route
        this.$router.push('/')
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth// left boundary
      const left = e.clientX - offsetLeft + 230 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY + 20
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../../styles/variables";
.tags-view-container {
  // width: calc(100vw - 210px);
  width: calc(100vw - 0px);
  background: #fff;
  border: 1px solid #eee;
  .tags-view-wrapper {
    .tags-view-title {
      width: $sideBarWidth;
      position: absolute;
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #fff;
      border-bottom: 1px slateblue solid;
    }
    .tags-view-group {
    }
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      top: 5px;
      height: 30px;
      line-height: 30px;
      color: #333333;
      background: #fff;
      padding: 0 8px;
      text-align: center;
      font-size: 14px;
      margin-left: 5px;
      margin-top: 4px;
      min-width: 85px;
      border: 1px solid #ddd;
      &:first-of-type {
        margin-left: 20px;
      }
      &:last-of-type {
        margin-right: 20px;
      }
      &.active {
        background-color: #fff;
        color: #1e88e5;
        border: 1px solid #1e88e5;
        &::before {
          content: "";
          // background: #426be8;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 9999;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      // vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        // vertical-align: -3px;
      }
      &:hover {
        background: #b0bec5;
        color: #fff;
      }
    }
  }
}
</style>
