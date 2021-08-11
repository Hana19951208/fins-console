import Vue from "vue";
import Router from "vue-router";
import systemRouter from "./modules/basic-edition/system"; // 系统管理
import customerAssignEngineRouter from "./modules/customer-assign-engine"; // 客户分配引擎
import marketingRouter from "./modules/basic-edition/marketing"

Vue.use( Router );

import Layout from "@/views/layout/Layout";
export const constantRouterMap = [ {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [ {
      path: "/redirect/:path*",
      component: () => import( "@/views/redirect/index" )
    } ]
  },
  {
    path: "/login",
    component: () => import( "@/views/login/index" ),
    hidden: true
  },
  {
    path: "/startUp",
    component: () => import( "@/views/startUp/index" ),
    hidden: true
  },
  {
    path: "/auth-redirect",
    component: () => import( "@/views/login/authredirect" ),
    hidden: true
  },
  {
    path: "/404",
    component: () => import( "@/views/errorPage/404" ),
    hidden: true
  },
  {
    path: "/401",
    component: () => import( "@/views/errorPage/401" ),
    hidden: true
  },
  //客户分配：工作流界面
  {
    path: "/customer-assign-engine/flow-chart",
    component: () => import( "@/views/customer-assign-engine/strategy-config/flow-chart" ),
    hidden: true
  },
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [ {
        path: "dashboard",
        component: () => import( "@/views/dashboard/index" ),
        name: "Dashboard",
        meta: {
          title: "dashboard",
          icon: "dashboard",
          noCache: true,
          affix: true,
          url: "#"
        }
      },
      {
        path: "/components/public-detail", // 跳转到公共详情页
        component: () => import( "@/components/PublicDetail" ),
        hidden: true
      },
      // 通用客户详情
      {
        path: "/common/customer-detail",
        component: () => import( "@/views/common/customer-detail" ),
        hidden: true
      },

      // 客户分配：指标新增
      {
        path: "/customer-assign-engine/add-target-config",
        component: () => import( "@/views/customer-assign-engine/target-config/add" ),
        hidden: true
      },
      // 客户分配：指标查看
      {
        path: "/customer-assign-engine/detail-target-config",
        component: () => import( "@/views/customer-assign-engine/target-config/detail" ),
        hidden: true
      },
      // 客户分配：动作新增
      {
        path: "/customer-assign-engine/add-action-config",
        component: () => import( "@/views/customer-assign-engine/action-config/add" ),
        hidden: true
      },
      // 客户分配：动作查看
      {
        path: "/customer-assign-engine/detail-action-config",
        component: () => import( "@/views/customer-assign-engine/action-config/detail" ),
        hidden: true
      },
      // 系统管理：应用新增页面
      {
        path: "/system/application/add",
        component: () => import( "@/views/basic-edition/system/application/add" ),
        hidden: true
      },
      // 系统管理：应用详情页面
      {
        path: "/system/application/detail",
        component: () => import( "@/views/basic-edition/system/application/detail" ),
        hidden: true
      },
      // 系统管理：产品新增页面
      {
        path: "/system/product/add",
        component: () => import( "@/views/basic-edition/system/product/add" ),
        hidden: true
      },
      // 系统管理：产品详情页面
      {
        path: "/system/product/detail",
        component: () => import( "@/views/basic-edition/system/product/detail" ),
        hidden: true
      },
      // 系统管理：角色管理-权限管理页面
      {
        path: "/system/role/resource",
        component: () => import( "@/views/basic-edition/system/role/resource/index" ),
        hidden: true
      },
    ]
  }
];

export default new Router( {
  scrollBehavior: () => ( {
    y: 0
  } ),
  routes: constantRouterMap
} );

export const asyncRouterMap = [
  systemRouter,
  customerAssignEngineRouter,
  marketingRouter
];