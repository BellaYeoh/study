import { Effect, Reducer } from 'umi';
import { BlogManagementState } from './index.d';
import { getBlogDetail } from './service';
import { PageConfig, responseChecker } from '@/utils';

type Model = {
  namespace: string;
  state: BlogManagementState;
  effects: {
    getBlogDetail: Effect;
  };
  reducers: {
    saveState: Reducer;
  };
};

const model: Model = {
  namespace: 'blogManagement',
  state: {
    id: '',
    title: '',
    summary: '',
    markdownContent: '',
    pageIndex: PageConfig.defaultPageIndex,
    pageSize: PageConfig.defaultPageSize,
    blogList: [],
  },
  effects: {
    *getBlogDetail({ payload: { id } }, { call, put }) {
      const response = yield call(getBlogDetail, { id });

      if (responseChecker(response)) {
        const {
          data: { title, summary, markdownContent },
        } = response;

        yield put({
          type: 'saveState',
          payload: {
            id,
            title,
            summary,
            markdownContent,
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
