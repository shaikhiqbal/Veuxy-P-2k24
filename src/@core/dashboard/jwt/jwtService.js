import axios from "axios";
import jwtDefaultConfig from "./jwtDefaultConfig";
require("dotenv").config();

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig };

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false;

  // ** For Refreshing Token
  subscribers = [];

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };

    // ** Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        // ** Get token from localStorage
        const accessToken = this.getToken();

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // ** const { config, response: { status } } = error
        const { config, response } = error;
        const originalRequest = config;

        // ** if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            this.refreshToken().then((r) => {
              this.isAlreadyFetchingAccessToken = false;

              // ** Update accessToken in localStorage
              this.setToken(r.data.accessToken);
              this.setRefreshToken(r.data.refreshToken);

              this.onAccessTokenFetched(r.data.accessToken);
            });
          }
          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              // ** Make sure to assign accessToken according to your response.
              // ** Check: https://pixinvent.ticksy.com/ticket/2413870
              // ** Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
              resolve(this.axios(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  getRefreshToken() {
    return sessionStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value) {
    sessionStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  companyprofile(...args) {
    return axios.post(this.jwtConfig.companyprofile, ...args);
  }
  getcompanyprofile(...args) {
    return axios.post(this.jwtConfig.get_company_profile, ...args);
  }

  putcompanyprofile(id, ...args) {
    return axios.put(this.jwtConfig.companyprofile + id + "/", ...args);
  }
  putCompanyownershipprofile(id, ...args) {
    return axios.put(
      this.jwtConfig.companyownershipprofile + id + "/",
      ...args
    );
  }

  postcompanyownershipprofile(...args) {
    return axios.post(this.jwtConfig.companyownershipprofile, ...args);
  }
  cop_get_view(...args) {
    return axios.post(this.jwtConfig.cop_get_view, ...args);
  }

  cop_delete(uid) {
    return axios.delete(this.jwtConfig.cop_delete + uid + "/");
  }

  postbusinessprofile(...args) {
    return axios.post(this.jwtConfig.businessprofile, ...args);
  }
  getbusinessprofile(...args) {
    return axios.post(this.jwtConfig.get_bussiness_profile, ...args);
  }
  putbusinessprofile(id, ...args) {
    return axios.put(this.jwtConfig.businessprofile + id + "/", ...args);
  }

  postsecuritymeasures(...args) {
    return axios.post(this.jwtConfig.securitymeasures, ...args);
  }
  getsecuritymeasures(...args) {
    return axios.post(this.jwtConfig.get_security_measures, ...args);
  }
  putsecuritymeasures(id, ...args) {
    return axios.put(this.jwtConfig.securitymeasures + id + "/", ...args);
  }

  postsettlementbankdetails(...args) {
    return axios.post(this.jwtConfig.settlementbankdetails, ...args);
  }
  sbd_get_view(...args) {
    return axios.post(this.jwtConfig.sbd_get_view, ...args);
  }
  putsettlementbankdetails(id, ...args) {
    return axios.put(this.jwtConfig.settlementbankdetails + id + "/", ...args);
  }
  sbd_delete(uid) {
    return axios.delete(this.jwtConfig.sbd_delete + uid + "/");
  }
  postmerchantcontact(...args) {
    return axios.post(this.jwtConfig.merchantcontact, ...args);
  }
  getmerchantcontact(...args) {
    return axios.post(this.jwtConfig.mc_get_view, ...args);
  }
  putmerchantcontact(id, ...args) {
    return axios.put(this.jwtConfig.merchantcontact + id + "/", ...args);
  }
  postfileupload(...args) {
    return axios.post(this.jwtConfig.uploadocument, ...args);
  }
  putfileupload(id, ...args) {
    return axios.put(this.jwtConfig.uploadocument + id + "/", ...args);
  }
  getfileupload(...args) {
    return axios.post(this.jwtConfig.getdocuments, ...args);
  }
  cop_document(...args) {
    return axios.post(this.jwtConfig.cop_document, ...args);
  }

  cardtype() {
    return axios.get(this.jwtConfig.cardtype);
  }
  postUserInfoAdmin(...args) {
    return axios.post(this.jwtConfig.userInfoAdmin, ...args);
  }
  putUserInfoAdmin(id, ...args) {
    return axios.put(this.jwtConfig.userInfoAdmin + id + "/", ...args);
  }
  blockUserData(id) {
    return axios.delete(this.jwtConfig.userInfoAdmin + id);
  }
  deleteUserData(id) {
    return axios.delete(this.jwtConfig.userInfoAdmin + id + "/?wantto=delete");
  }
  unBlockUser(id) {
    return axios.get(this.jwtConfig.unblockUser + id);
  }
  getApplication() {
    return axios.get(this.jwtConfig.application);
  }
  companyprofileQuery(uid) {
    return axios.get(this.jwtConfig.cp_query + uid);
  }
  companyownershipprofileQuery(uid) {
    return axios.get(this.jwtConfig.cop_query + uid);
  }
  businessprofileQuery(uid) {
    return axios.get(this.jwtConfig.bp_query + uid);
  }
  securitymeasureQuery(uid) {
    return axios.get(this.jwtConfig.mc_query + uid);
  }
  settlementbankdetailsQuery(uid) {
    return axios.get(this.jwtConfig.sbd_query + uid);
  }
  merchantcontactQuery(uid) {
    return axios.get(this.jwtConfig.mc_query + uid);
  }
  applicationmerchant() {
    return axios.get(this.jwtConfig.applicationmerchant);
  }
  getalltypeuser() {
    return axios.get(this.jwtConfig.getalltypesusers);
  }
  application_view(state = "") {
    return axios.get(this.jwtConfig.application_view + state);
  }
  application_for_dashboard(state = "") {
    return axios.get(this.jwtConfig.application_for_dashboard + state);
  }
  postNote(...args) {
    return axios.post(this.jwtConfig.note, ...args);
  }
  getNote(...args) {
    return axios.post(this.jwtConfig.getnote, ...args);
  }
  getmanualQueryTemplate() {
    return axios.get(this.jwtConfig.manualQueryTemplate);
  }
  postmanualQueryTemplate(...args) {
    return axios.post(this.jwtConfig.manualQueryTemplate, ...args);
  }
  putmanualQueryTemplate(id = "", ...args) {
    return axios.put(this.jwtConfig.manualQueryTemplate + id + "/", ...args);
  }
  deleteManualQueryTemplate(id = "", ...args) {
    return axios.delete(this.jwtConfig.manualQueryTemplate + id + "/");
  }
  uploadAppication(...args) {
    return axios.post(this.jwtConfig.uploadAppication, ...args);
  }
  markreadasunderwriter() {
    return axios.get(this.jwtConfig.markreadasunderwriter);
  }
  markreadasmerchant() {
    return axios.get(this.jwtConfig.markreadasmerchant);
  }
  acquiringBank() {
    return axios.get(this.jwtConfig.acquiringBank);
  }
  merchantCategory() {
    return axios.get(this.jwtConfig.merchantCategory);
  }
  merchantType() {
    return axios.get(this.jwtConfig.merchantType);
  }
  settlement() {
    return axios.get(this.jwtConfig.settlement);
  }
  creditCard() {
    return axios.get(this.jwtConfig.creditCard);
  }
  paymentServices() {
    return axios.get(this.jwtConfig.paymentServices);
  }
  currency() {
    return axios.get(this.jwtConfig.currency);
  }
  vertualTerminal(...args) {
    return axios.post(this.jwtConfig.vertualTerminal, ...args);
  }
  acitveCard() {
    return axios.get(this.jwtConfig.acitveCard);
  }
  merchantSetting() {
    return axios.get(this.jwtConfig.merchantSetting);
  }
  approvedByAdmin(...args) {
    return axios.post(this.jwtConfig.approvedByAdmin, ...args);
  }
  approvedByUW(...args) {
    return axios.post(this.jwtConfig.approvedByUW, ...args);
  }
  applicationApproved(...args) {
    return axios.post(this.jwtConfig.applicationApproved, ...args);
  }
  sendBuyRate(...args) {
    return axios.post(this.jwtConfig.sendBuyRate, ...args);
  }
  updateBuyRate(id, ...args) {
    return axios.put(this.jwtConfig.sendBuyRate + id + "/", ...args);
  }
  getBuyRate(id) {
    return axios.get(this.jwtConfig.sendBuyRate + "?application__uid=" + id);
  }
  sendSaleRate(...args) {
    return axios.post(this.jwtConfig.sendSaleRate, ...args);
  }
  updateSaleRate(id, ...args) {
    return axios.put(this.jwtConfig.sendSaleRate + id + "/", ...args);
  }
  getSaleRate(id) {
    return axios.get(this.jwtConfig.sendSaleRate + "?application__uid=" + id);
  }
  saleRateView(id) {
    return axios.get(this.jwtConfig.saleRateView + id);
  }
  approvedByMerchant(...args) {
    return axios.post(this.jwtConfig.approvedByMerchant, ...args);
  }
  approvedByIso(...args) {
    return axios.post(this.jwtConfig.approvedByIso, ...args);
  }
  // **  New Merchant Dashboar Setting  **//

  // ** Permissions List **
  permissionsList() {
    return axios.get(this.jwtConfig.merchant_role_permissions);
  }

  // ** Merchant User Create **
  createNewMerchantUser(...args) {
    return axios.post(this.jwtConfig.create_merchant_user, ...args);
  }

  // ** Merchant User Update **
  updateMerchantUser(uid, ...args) {
    return axios.put(this.jwtConfig.create_merchant_user + uid, ...args);
  }

  //** Merchant User Get Details **
  getMerchnatUserDetails(uid) {
    return axios.get(this.jwtConfig.create_merchant_user + uid);
  }

  // ** Merchant User Delete **
  deleteMerchantUser(uid) {
    return axios.delete(this.jwtConfig.create_merchant_user + uid);
  }

  roleSetting(){
    // merchant_role_setting
    return axios.get(this.jwtConfig.merchant_role_setting);
  }
}
