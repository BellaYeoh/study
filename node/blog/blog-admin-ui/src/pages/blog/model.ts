import { Effect, Reducer } from 'umi';
import { BlogManagementState } from './index.d';
import { getBlogList } from './service';
import { PageConfig, responseChecker } from '@/utils';

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
  state: {
    title: '',
    summary: '',
    pageIndex: PageConfig.defaultPageIndex,
    pageSize: PageConfig.defaultPageSize,
    blogList: [],
  },
  effects: {
    *getBlogList(
      { payload: { title, summary, pageIndex, pageSize } },
      { call, put },
    ) {
      const response = yield call(getBlogList, {
        title,
        summary,
        pageIndex,
        pageSize,
      });

      if (responseChecker(response)) {
        const { data } = response;
        yield put({
          type: 'saveState',
          payload: {
            blogList: data || [],
          },
        });
      }
    },
  },
  reducers: {
    saveState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
export default model;
