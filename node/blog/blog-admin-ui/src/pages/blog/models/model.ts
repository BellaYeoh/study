import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { PageConfig, responseChecker } from '@/utils';
import { BlogManagementState } from '../index.d';
import {
  getBlogDetail,
  getCategoryList,
  getTagList,
  deleteBlog,
} from '../service';

type Model = {
  namespace: string;
  state: BlogManagementState;
  effects: {
    getInitData: Effect;
    getBlogDetail: Effect;
    deleteBlog: Effect;
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
    categoryList: [],
    tagList: [],
  },
  effects: {
    *getInitData(_, { call, put, all }) {
      const [categoryRes, tagRes] = yield all([
        call(getCategoryList),
        call(getTagList),
      ]);

      const payload: Partial<BlogManagementState> = {};

      if (responseChecker(categoryRes)) {
        const { data = [] } = categoryRes;
        payload.categoryList = data.map((item: any) => item.name);
      }

      if (responseChecker(tagRes)) {
        const { data = [] } = tagRes;
        payload.tagList = data.map((item: any) => item.name);
      }

      yield put({
        type: 'saveState',
        payload,
      });
    },
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
    *deleteBlog({ payload: { id } }, { call }) {
      const response = yield call(deleteBlog, { id });
      if (responseChecker(response)) {
        message.success('删除成功！');
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
