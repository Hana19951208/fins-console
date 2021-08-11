import Layout from '@/views/layout/Layout'

const modelAndPolicyRouter = {
  path: '/model-and-policy',
  component: Layout,
  redirect: 'noredirect',
  name: '模型与策略管理',
  alwaysShow: false,
  meta: {
    title: '模型与策略管理',
    icon: 'chart',
    url: '/model-and-policy'
  },
  children: [ {
    path: '/target', // 指标管理
    component: () => import( '@/views/basic-edition/modelAndPolicy/target' ),
    name: 'Target',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#model-and-policy/target/grid'
    }
  },
  {
    path: '/model', // 模型管理
    component: () => import( '@/views/basic-edition/modelAndPolicy/model' ),
    name: 'Model',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#model-and-policy/model'
    }
  },
  {
    path: '/industryKeywordsBlacklistStrategy', // 行业关键词策略
    component: () => import( '@/views/basic-edition/modelAndPolicy/industryKeywordsBlacklistStrategy' ),
    name: 'IndustryKeywordsBlacklistStrategy',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#model-and-policy/industryKeywordsBlacklistStrategy'
    }
  },
  {
    path: '/blacklistStrategy', // 黑名单策略
    component: () => import( '@/views/basic-edition/modelAndPolicy/blacklistStrategy' ),
    name: 'BlacklistStrategy',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#model-and-policy/blacklistStrategy'
    }
  },
  {
    path: '/customerGroupManager', // 客户群体管理
    component: () => import( '@/views/basic-edition/modelAndPolicy/customerGroupManager' ),
    name: 'CustomerGroupManager',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#model-and-policy/custom/list'
    }
  },
  {
    path: '/limit', // 额度策略
    component: () => import( '@/views/basic-edition/modelAndPolicy/limit' ),
    name: 'Limit',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#model-and-policy/limit/list'
    }
  },
  {
    path: '/threshold', // 阈值策略
    component: () => import( '@/views/basic-edition/modelAndPolicy/threshold' ),
    name: 'Threshold',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#model-and-policy/threshold'
    }
  },
  {
    path: '/groupPolicy', // 群体策略配置
    component: () => import( '@/views/basic-edition/modelAndPolicy/groupPolicy' ),
    name: 'GroupPolicy',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#model-and-policy/group/list'
    }
  },
  {
    path: '/model-strategy-audit', // 模型与策略审核
    component: () => import( '@/views/basic-edition/modelAndPolicy/modelStrategyAudit' ),
    name: 'ModelStrategyAudit',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#model-and-policy/model-strategy-audit/list'
    }
  },
  {
    path: '/anti-fraud-rules', // 反欺诈规则管理
    component: () => import( '@/views/basic-edition/modelAndPolicy/antiFraudRulesMgr' ),
    name: 'AntiFraudRulesMgr',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#model-and-policy/antiFraudRulesMgr/list'
    }
  },
  {
    path: '/investigationStrategy', // 调查策略
    component: () => import( '@/views/basic-edition/modelAndPolicy/investigationStrategy' ),
    name: 'InvestigationStrategy',
    meta: {
      title: '',
      noCache: true,
      icon: '',
      url: '#model-and-policy/research'
    }
  } ]
}

export default modelAndPolicyRouter