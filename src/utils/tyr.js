import axios from 'axios';
// import { showLoading, hideLoading } from 'react-redux-loading-bar';
// import { store } from '../index';

const tyr = axios.create({
  baseURL: '/api/v1/'
});

export default {
  get: async (url, config = {}) => {
    // store.dispatch(showLoading());
    try {
      const res = await tyr.get(url, {
        ...config,
        withCredentials: true
      });
      return res;
    } catch (e) {
      throw e;
    } finally {
      // store.dispatch(hideLoading());
    }
  },
  post: async (url, data, config = {}) => {
    // store.dispatch(showLoading());
    try {
      const res = await tyr.post(url, data, {
        ...config,
        withCredentials: true
      });
      return res;
    } catch (e) {
      /* eslint-disable-next-line */
      console.log(e);
      throw e;
    } finally {
      // store.dispatch(hideLoading());
    }
  }
};
