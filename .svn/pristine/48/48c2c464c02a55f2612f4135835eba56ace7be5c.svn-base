import Layout from "@/views/layout/Layout";

const systemRouter = {
  path: "/system",
  component: Layout,
  redirect: "noredirect",
  name: "系统管理",
  alwaysShow: true,
  meta: {
    title: "charts",
    icon: "setting",
    url: "/system"
  },
  children: [ {
    path: "/product", // 产品管理
    component: () => import( "@/views/basic-edition/system/product" ),
    name: "Product",
    meta: {
      title: "",
      icon: "",
      noCache: true,
      url: "#system-manage/product"
    }
  },
  {
    path: "/application", // 应用管理
    component: () => import( "@/views/basic-edition/system/application" ),
    name: "Application",
    meta: {
      title: "",
      icon: "",
      noCache: true,
      url: "#system-manage/application"
    }
  },
  {
    path: "/organization", // 机构管理
    component: () => import( "@/views/basic-edition/system/organization" ),
    name: "Organization",
    meta: {
      title: "",
      icon: "",
      noCache: true,
      url: "#system-manage/organization"
    }
  },
  {
    path: "/resource", // 资源管理
    component: () => import( "@/views/basic-edition/system/resource" ),
    name: "Resource",
    meta: {
      title: "",
      icon: "",
      noCache: true,
      url: "#system-manage/resources"
    }
  },
  {
    path: "/user", // 用户管理
    component: () => import( "@/views/basic-edition/system/user" ),
    name: "User",
    meta: {
      title: "",
      icon: "",
      noCache: true,
      url: "#system-manage/user"
    }
  },
  {
    path: "/menu", // 菜单管理
    component: () => import( "@/views/basic-edition/system/menu" ),
    name: "Menu",
    meta: {
      title: "",
      icon: "",
      noCache: true,
      url: "#system-manage/menu"
    }
  },
  {
    path: "/dict", // 字典管理
    component: () => import( "@/views/basic-edition/system/dict" ),
    name: "Dict",
    meta: {
      title: "",
      icon: "",
      noCache: true,
      url: "#system-manage/dict"
    }
  },
  {
    path: "/role", // 角色管理
    component: () => import( "@/views/basic-edition/system/role" ),
    name: "Role",
    meta: {
      title: "",
      icon: "",
      noCache: true,
      url: "#system-manage/role"
    }
  } ]
};

export default systemRouter;