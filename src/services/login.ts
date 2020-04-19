import request from '@/utils/request';
//import { Constants } from "@/utils/constant";

export interface LoginParamsType {
  userMail: string;
  userPwd: string;
  // mobile: string;
  // captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request(`http://localhost:8080/pop3/auth`,{
  //return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
