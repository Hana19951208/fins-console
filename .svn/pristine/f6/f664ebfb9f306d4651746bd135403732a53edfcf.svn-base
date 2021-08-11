import Layout from '@/views/layout/Layout'

const customerAssignEngineRouter = {
  path: '/customer-assign-engine',
  component: Layout,
  redirect: 'noredirect',
  name: '客户分配引擎',
  alwaysShow: true,
  meta: {
    title: '客户分配引擎',
    icon: 'customer',
    url: '/customer-assign-engine'
  },
  children: [{
    path: '/target-config', // 分配指标配置
    component: () => import('@/views/customer-assign-engine/target-config'),
    name: 'TargetConfig',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#customer-assign-engine/target-config'
    }
  }, {
    path: '/action-config', // 分配动作配置
    component: () => import('@/views/customer-assign-engine/action-config'),
    name: 'ActionConfig',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#customer-assign-engine/action-config'
    }
  }, {
    path: '/strategy-config', // 分配流程策略配置
    component: () => import('@/views/customer-assign-engine/strategy-config'),
    name: 'StrategyConfig',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#customer-assign-engine/strategy-config'
    }
  }]
}

export default customerAssignEngineRouter
