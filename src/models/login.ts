import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';

import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

// export interface StateType {
//   status?: '200' | '404';
//   type?: string;
//   currentAuthority?: 'user' | 'guest' | 'admin'| null ;
// }
export interface StateType {
  errcode?: '200'|'404'
  errmsg?: string;
  data?:'user' | 'guest' | 'admin'| null ;
}



export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    errcode: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        // type: 'changeLoginStatus',
        // payload: response,
        type: 'changeLoginStatus',
        payload: response,
      });
      
      //数据重命名 授权
      response.currentAuthority=response.data='admin';
      response.type=response.errmsg;


      // Login successfully
      if (response.errcode === '200') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        errcode: payload.errcode,
        type: payload.type,
        // Errcode: payload.Errcode,
        // Errmsg: payload.Errmsg,
      };
    },
  },
};

export default Model;
