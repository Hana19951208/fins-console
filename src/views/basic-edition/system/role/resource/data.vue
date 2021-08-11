<template>
  <div class="data-resource">
    <div class="text-right">
      <el-button type="primary" @click="saveDataResource" @loading="loading">保存</el-button>
    </div>
    <el-divider></el-divider>
    <el-radio-group v-model="roleDataAuth" class="data-box">
      <el-radio v-for="item in roleDataDs" :key="item.code" :label="item.code" border class="d-block mb-3">{{ item.name }}</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
import { GLOBAL, mappingData } from '@/utils'
export default {
  props: {
    roleId: {
      type: String,
      default: '',
    },
    appInfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      roleDataAuth: 1,
      form: {
        appsId: null,
        roleChannel: null,
        roleId: null,
      },
      roleDataDs: [
        {
          name: '本人',
          code: 1,
        },
        {
          name: '本机构',
          code: 2,
        },
        {
          name: '本机构及下级机构',
          code: 3,
        },
        {
          name: '全部',
          code: 4,
        },
      ],
    }
  },
  watch: {
    appInfo: {
      handler(val) {
        if (val) {
          this.initData(val)
        }
      },
      deep: true,
    },
  },
  methods: {
    initData(data) {
      Object.assign(this.form, mappingData(data, this.form))
      this.$api.role.selectDataAuth(this.form).then((res) => {
        this.roleDataAuth = res.roleDataAuth || 1
      })
    },
    saveDataResource() {
      this.$confirm('确认要保存此次配置吗？', {
        confirmButtonText: '确认',
        cancelButtonText: '返回',
        type: 'warning',
        title: '操作提示',
      }).then(() => {
        this.loading = true
        this.$api.role
          .updateDataAuth({
            ...this.form,
            roleDataAuth: this.roleDataAuth,
          })
          .then(() => {
            this.loading = false
            this.$message({ message: GLOBAL.OPERATE_SUCCESS, type: 'success' })
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.data-resource {
  .data-box {
    padding: 24px 36px;
    overflow-y: auto;
    height: calc(100% - 50px);
  }
  /deep/.el-radio.is-bordered + .el-radio.is-bordered {
    margin-left: 0;
  }
  /deep/.el-radio--small.is-bordered {
    width: 200px;
  }
  /deep/.el-divider--horizontal {
    margin: 8px 0;
  }
}
</style>