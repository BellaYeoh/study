export default {
  'POST /api/blog/add': {
    success: true,
  },
  'GET /api/blog/list': {
    success: true,
    data: [
      {
        id: '1',
        title: '文章',
        summary: '概述概述概述',
        createTime: '2020-03-10',
      },
      {
        id: '2',
        title: '文章',
        summary: '概述概述概述',
        createTime: '2020-03-10',
      },
      {
        id: '3',
        title: '文章',
        summary: '概述概述概述',
        createTime: '2020-03-10',
      },
      {
        id: '4',
        title: '文章',
        summary: '概述概述概述',
        createTime: '2020-03-10',
      },
      {
        id: '5',
        title: '文章',
        summary: '概述概述概述',
        createTime: '2020-03-10',
      },
    ],
    total: 100,
  },
};
