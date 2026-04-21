import axiosClient from './axiosClient';
import {type refreshFormData, type forgotpasswordFormData, type SignInFormData, type SignupFormData, type verifyOtpFormData, type resetPasswordFormData } from '../types/user';

const authApi = {
  signIn(data: SignInFormData) {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  
  signUp(data: SignupFormData) {
    const url = '/auth/signup';
    return axiosClient.post(url, data);
  },

  forgotPassword(data : forgotpasswordFormData) {
    const url = '/auth/ForgotPassword';
    return axiosClient.post(url,  data );
  },
  verifyOtp(data: verifyOtpFormData) {
    const url = 'auth/forgotPassword/verify-otp';
    return axiosClient.post(url, data);
  },

  resetPassword(data: resetPasswordFormData) {
    const url = '/auth/change-password';
    return axiosClient.post(url, data);
  },


  refresh(data: refreshFormData) {
    const url = '/auth/refresh-token';
    return axiosClient.post(url, data);
  }
};

export default authApi;