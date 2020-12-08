import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'http://139.155.36.182:3000',
});

instance.interceptors.request.use(
  (req) => {
    if (store.state.token) {
      // eslint-disable-next-line no-param-reassign
      req.headers.authorization = `Bearer ${store.state.token}`;
      return req;
    }
    if (!store.state.token) {
      // 初始状态时，token === ""
      // 这种解决方案暂时感觉有点不妥
      return req;
    }
    // eslint-disable-next-line no-throw-literal
    throw { message: 'the token is not available' };
  },
  (error) => Promise.reject(error),
);

export default instance;
