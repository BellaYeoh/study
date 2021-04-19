import { responseChecker } from '@/utils';
import { Effect, Reducer } from 'umi';
import { EditBlogState } from '../EditBlog.d';
import { getBlogDetail, getCategoryList, getTagList } from '../service';

type Model = {
  namespace: string;
  state: EditBlogState;
  effects: {
    getInitData: Effect;
    getBlogDetail: Effect;
  };
  reducers: {
    saveState: Reducer;
  };
};

const model: Model = {
  namespace: 'editBlog',
  state: {
    id: '',
    title: '',
    category: '',
    tags: [],
    summary: '',
    markdownContent: '',
    categoryList: [],
    tagList: [],
  },
  effects: {
    *getInitData(_, { call, put, all }) {
      const [categoryRes, tagRes] = yield all([
        call(getCategoryList),
        call(getTagList),
      ]);

      const payload: Partial<EditBlogState> = {};

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
