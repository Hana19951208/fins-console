/*
 * 接口统一集成模块
 */
import * as login from "./login";
import * as common from "./modules/common";
import * as dashboard from "./modules/dashboard";
import * as dict from "./modules/system/dict"; // 配置中心-字典管理
import * as menu from "./modules/system/menu"; // 配置中心-菜单管理
import * as resource from "./modules/system/resource"; // 配置中心-资源管理
import * as role from "./modules/system/role"; // 配置中心-角色管理
import * as organization from "./modules/system/organization"; // 配置中心-机构管理
import * as application from "./modules/system/application"; // 配置中心-应用管理
import * as user from "./modules/system/user"; // 配置中心-用户管理
import * as product from "./modules/system/product"; // 配置中心-产品管理
import * as targetConfig from "./modules/customer-assign-engine/target-config"; // 客户分配-指标管理
import * as actionConfig from "./modules/customer-assign-engine/action-config"; // 客户分配-动作管理
import * as strategyConfig from "./modules/customer-assign-engine/strategy-config"; // 客户分配-策略管理
import * as mrkOrg from "./modules/system/marketing-org"; // 营销管理-机构管理
import * as mrkPerson from "./modules/system/marketing-person"; // 营销管理-人员管理

export default {
  login,
  common,
  dashboard,
  dict,
  menu,
  resource,
  role,
  organization,
  user,
  product,
  application,
  targetConfig,
  actionConfig,
  strategyConfig,
  mrkOrg,
  mrkPerson
};