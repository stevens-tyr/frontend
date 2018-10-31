import initialState from '../store/initialState';

export default (state = initialState.test, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
