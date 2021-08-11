import Layout from "@/views/layout/Layout";

const marketingRouter = {
  path: "/marketing",
  component: Layout,
  redirect: "noredirect",
  name: "营销管理",
  alwaysShow: true,
  meta: {
    title: "charts",
    icon: "setting",
    url: "/marketing"
  },
  children: [
  {
    path: "/mrk-organization", // 机构管理
    component: () => import( "@/views/basic-edition/marketing/organization" ),
    name: "MrkOrganization",
    meta: {
      title: "",
      icon: "",
      noCache: true,
      url: "#marketing-manage/organization"
    }
  },
  {
    path: "/mrk-person", // 人员管理
    component: () => import( "@/views/basic-edition/marketing/person" ),
    name: "MrkPerson",
    meta: {
      title: "",
      icon: "",
      noCache: true,
      url: "#marketing-manage/person"
    }
  }, ]
};

export default marketingRouter;