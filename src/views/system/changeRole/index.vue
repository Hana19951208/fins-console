<template>
  <div>
    <el-dialog :visible.sync="show" width="640px" custom-class="x-dialog" title="角色切换" @closed="closeDialog">
      <div>
        <ul class="area-list clearfix">
          <li v-for="(item, index) in roleList" :key="index" :class="{ actived: curRoleId == item.roleId }" @click="onItemChange(item)">
            {{ item.roleName }}
          </li>
        </ul>
      </div>
      <div class="text-right pt-2">
        <el-button @click="closeDialog">
          <span class="mx-2">返回</span>
        </el-button>
        <el-button type="primary" @click="onRoleChange">
          <span class="mx-2">确定</span>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mappingData } from '@/utils'
export default {
  props: {
    value: {
      default: false,
      type: Boolean,
    },
    curRole: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      show: false,
      curRoleId: '',
      role: {},
    }
  },
  watch: {
    value(value) {
      this.show = value
      if (value) {
        this.curRoleId = this.curRole
      }
    },
  },
  computed: {
    ...mapGetters(['roles']),
    roleList() {
      return typeof this.roles === 'string' ? JSON.parse(this.roles) : this.roles || []
    },
  },
  methods: {
    onItemChange(item) {
      this.curRoleId = item.roleId
      this.roleName = item.roleName
      this.role = item
    },
    onRoleChange() {
      if (this.curRoleId) {
        this.$store.dispatch('ChangeRole', this.role).then(() => {
          this.closeDialog()
          let baseUrl = ''
          if (typeof location.origin === 'undefined') {
            baseUrl = location.protocol + '//' + location.host
          } else {
            baseUrl = window.location.origin
          }
          window.location.href = baseUrl
        })
      }
    },
    closeDialog() {
      this.$emit('show')
    },
  },
}
</script>

<style lang="scss" scoped>
.x-dialog {
  .area-list {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      float: left;
      border: 1px solid #ddd;
      padding: 8px 24px;
      margin-right: 12px;
      cursor: pointer;
      font-size: 14px;
      margin-bottom: 24px;
      border-radius: 4px;
    }
    li:hover,
    li.actived {
      border: 1px solid;
      color: darkcyan;
      position: relative;
      &::after {
        content: '√';
        position: absolute;
        right: 0;
        top: 0;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        transform: rotate(35deg);
      }
    }
  }
}
</style>
