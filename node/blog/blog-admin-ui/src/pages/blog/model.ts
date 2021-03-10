import { Effect, Reducer } from 'umi';
import { BlogManagementState } from './index.d';

type Model = {
  namespace: string;
  state: BlogManagementState;
  effects: {
    getBlogList: Effect;
  };
  reducers: {
    saveState: Reducer;
  };
};

const model: Model = {
  namespace: 'blogManagement',
  effects: {
    *getBlogList() {},
  },
};
export default model;
