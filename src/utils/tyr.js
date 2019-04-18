import axios from 'axios';

const tyr = axios.create({
  baseURL: '/api/v1/'
});

export default {
  get: async (url, config = {}) => {
    try {
      const res = await tyr.get(url, {
        ...config,
        withCredentials: true
      });
      return res;
    } catch (e) {
      throw e;
    }
  },
  post: async (url, data, config = {}) => {
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
    }
  },
  delete: async (url, config = {}) => {
    try {
      const res = await tyr.delete(url, {
        ...config,
        withCredentials: true
      });
      return res;
    } catch (e) {
      throw e;
    }
  }
};
