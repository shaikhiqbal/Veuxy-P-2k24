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

        //---------->******** 
      // this.setLocation(config);
// console.log(config)
        
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
            this.refreshToken()
              .then((r) => {
                this.isAlreadyFetchingAccessToken = false;

                // ** Update accessToken in localStorage
                this.setToken(r.data.accessToken);
                this.setRefreshToken(r.data.refreshToken);

                this.onAccessTokenFetched(r.data.accessToken);
              })
              .catch((error) => {
                const { response } = error;
                if (response.status === 404) {
                  localStorage.removeItem("userData");
                  localStorage.removeItem(config.storageTokenKeyName);
                  sessionStorage.removeItem(config.storageRefreshTokenKeyName);
                }
              });
          }
          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              // ** Make sure to assign accessToken according to your response.kk
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
  
  setLocation(config) {
    if (config?.data?.login) config.headers.location = config?.data?.location;
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
    return sessionStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  getRefreshToken() {
    return sessionStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setToken(value) {
    sessionStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value) {
    sessionStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  // login(...args) {
  //   return axios.post(this.jwtConfig.loginEndpoint, ...args);
  // }
  login(...arg) {
    return axios.post(this.jwtConfig.loginEndpoint, ...arg);
  }

  verifyOtp(...args) {
    return axios.post(this.jwtConfig.verifyLoginOtpEndpoint, ...args);
  }
  changeEmail(...args) {
    return axios.post(this.jwtConfig.changeEmail, ...args);
  }

  verifyEmail(...args) {
    return axios.post(this.jwtConfig.verifyEmail, ...args);
  }
  changeMobileNo(...args) {
    return axios.post(this.jwtConfig.changeMobileNo, ...args);
  }
  verifyPhone(...args) {
    return axios.post(this.jwtConfig.verifyPhone, ...args);
  }
  resendOTPOnMassage(...args) {
    return axios.post(this.jwtConfig.resendOTPOnMassage, ...args);
  }
  resendOTPOnEmail(...args) {
    return axios.post(this.jwtConfig.resendOTPOnEmail, ...args);
  }
  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args);
  }
  resendOTPOnCall(...args) {
    return axios.post(this.jwtConfig.resendOTPOnCall, ...args);
  }
  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    });
  }
  resetPassword(...args) {
    return axios.post(this.jwtConfig.resetPassword, ...args);
  }
  changePassword(uid, token, ...args) {
    return axios.post(
      `${this.jwtConfig.changePassword}/${uid}/${token}`,
      ...args
    );
  }
  signinPhoneVerified(...args) {
    return axios.post(this.jwtConfig.signinPhoneVerified, ...args);
  }

  resetPasswordOtpRese(uid = "", token = "", ...args) {
    return axios.post(
      this.jwtConfig.resetPasswordOtpRese + "/" + uid + "/" + token,
      ...args
    );
  }
  resendOTPForreset(...args) {
    return axios.post(this.jwtConfig.resendOTPForreset, ...args);
  }
  verifynumberforactivation(uid, token, ...args) {
    return axios.post(
      this.jwtConfig.verifynumberforactivation + uid + "/" + token,
      ...args
    );
  }
  newpasswordresendOtp(uid = "", token = "", ...args) {
    return axios.post(
      `${this.jwtConfig.newpasswordresendOtp}/${uid}/${token}`,
      ...args
    );
  }
  resendOtp(uid = "", ...args) {
    return axios.post(`${this.jwtConfig.newpasswordresendOtp}/${uid}`, ...args);
  }
  newpassword(uid, token, ...args) {
    debugger
    return axios.post(this.jwtConfig.newpassword + uid + "/" + token, ...args);
  }
}
