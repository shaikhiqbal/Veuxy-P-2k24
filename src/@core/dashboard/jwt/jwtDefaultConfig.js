// ** Auth Endpoints

const applicationFormEndPoint = {
  companyprofile: "/api/macp/",
  companyownershipprofile: "/api/macop/",
  businessprofile: "/api/mabp/",
  securitymeasures: "/api/masm/",
  settlementbankdetails: "/api/masbd/",
  merchantcontact: "/api/mamc/",
  uploadocument: "/api/maud/",
  cardtype: "/api/mdct",
  get_company_profile: "/api/getmacp",
  cop_get_view: "/api/getmacop",
  get_bussiness_profile: "/api/getmabp",
  get_security_measures: "/api/getmasm",
  sbd_get_view: "/api/getmasbd",
  mc_get_view: "/api/getmamc",
  getdocuments: "/api/getmaud",
  cop_document: "/api/allcopd/",
  cop_delete: "/api/macop/",
  sbd_delete: "/masbd/",
};

// ** Aproved Merchant API
const merchantNewDashboarEndPoints = {
  // merchant_role_setting: "/api/ur/",
  merchant_role_setting: "/api/merchantsetting",
  merchant_role_permissions: "/api/up",
  create_merchant_user: "/api/muc/",
};

export default {
  ...applicationFormEndPoint,
  ...merchantNewDashboarEndPoints,
  // ** Get ALLTyp Users
  getalltypesusers: "/api/auc",
  application: "/api/application",
  // ** applicationmerchant:"/api/application_for_dashboard_view",
  application_view: "/api/application?status__in=",
  application_for_dashboard: "/api/allgma/",
  // ** upload Application;
  uploadAppication: "/api/ipu",
  // ** Form Query
  cp_query: "/cp_query",
  cop_query: "/cop_query",
  bp_query: "/bp_query",
  sm_query: "/sm_query",
  sbd_query: "/sbd_query",
  mc_query: "/mc_query",

  //** Admin
  userInfoAdmin: "/api/auc/",
  unblockUser: "/api/aucub/",
  applicationApproved: "/api/aa",

  // ** Note
  note: "/api/allt/",
  getnote: "/api/getallt",

  // ** query-managment
  manualQueryTemplate: "/api/auwmmqt/",
  markreadasunderwriter: "/api/mark_read_as_underwriter",
  markreadasmerchant: "/api/mark_read_as_merchant",

  // ** By Rates And Sale Rates API
  acquiringBank: "/api/mdab",
  merchantCategory: "/api/mdmcc",
  merchantType: "/api/mdmt",
  settlement: "/api/mdsp",
  creditCard: "/api/mdcc",
  paymentServices: "/api/mdps",
  currency: "/api/mdcy",
  sendBuyRate: "/api/auwmbbr/",
  sendSaleRate: "/api/auwmbsr/",
  saleRateView: "/api/imbsr/?application_uid=",

  // ** Merchant DashBoard-2
  vertualTerminal: "/api/mavt/",
  acitveCard: "/api/mavt",
  merchantSetting: "/api/merchantsetting",

  approvedByIso: "/api/abi",
  approvedByMerchant: "/api/abm",

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: "Bearer",

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",
};
