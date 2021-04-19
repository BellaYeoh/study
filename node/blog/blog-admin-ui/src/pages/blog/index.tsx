import React, { useEffect, useState } from 'react';
import { Button, Form, Select, message } from 'antd';
import { connect, Loading, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { getBlogList, AddBlogParams, addBlog } from './service';
import {
  BlogManagementProps,
  BlogListData,
  BlogManagementState,
} from './index.d';
import { PageConfig, responseChecker } from '@/utils';

const { Option } = Select;

const BlogManagement: React.FC<BlogManagementProps> = (props) => {
  const {
    dispatch,
    state: { id, title, summary, markdownContent, tagList, categoryList },
  } = props;

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'blogManagement/getInitData',
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      title,
      summary,
      markdownContent,
    });
  }, [title, summary, markdownContent]);

  const columns: ProColumns<BlogListData>[] = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '概述',
      dataIndex: 'summary',
      ellipsis: true,
    },
    {
      title: '分类',
      dataIndex: 'category',
      valueType: 'select',
      renderFormItem: () => (
        <Select>
          {categoryList.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: '标签',
      dataIndex: 'tags',
      valueType: 'select',
      renderFormItem: () => (
        <Select mode="multiple">
          {tagList.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: '创建时间',
      key: 'string',
      hideInSearch: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, { _id }) => [
        <a onClick={() => editBlog(_id)}>编辑</a>,
        <a onClick={() => deleteBlog(_id)}>删除</a>,
      ],
    },
  ];

  function editBlog(id: string) {
    dispatch({
      type: 'blogManagement/getBlogDetail',
      payload: {
        id,
      },
    });
    setModalVisible(true);
  }

  function deleteBlog(id: string) {
    dispatch({
      type: 'blogManagement/deleteBlog',
      payload: {
        id,
      },
    });
  }

  function goToEditBlogPage(id?: string) {
    history.push();
  }

  const FormComponent: React.FC = () => {
    return (
      <ModalForm
        visible={modalVisible}
        form={form}
        initialValues={{
          title,
          summary,
          markdownContent,
        }}
        trigger={
          <Button type="primary" onClick={() => setModalVisible(true)}>
            <PlusOutlined />
            新建
          </Button>
        }
        onFinish={async (values: any) => {
          const { title, summary, markdownContent } = values;
          const params: AddBlogParams = {
            title,
            summary,
            markdownContent,
          };

          if (id) {
            params.id = id;
          }

          const response = await addBlog(params);
          if (responseChecker(response)) {
            message.success('新建成功！');
          }

          form.resetFields();
          setModalVisible(false);
        }}
        modalProps={{
          onCancel: () => setModalVisible(false),
        }}
      >
        <ProForm.Group>
          <ProFormText
            name="title"
            width="md"
            label="标题"
            placeholder="请输入标题"
          />
          <ProFormTextArea
            name="summary"
            width="lg"
            label="概述"
            placeholder="请输入概述"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTextArea
            name="markdownContent"
            width="lg"
            label="文章内容"
            placeholder="请输入文章内容"
          />
        </ProForm.Group>
      </ModalForm>
    );
  };

  return (
    <PageContainer>
      <ProCard direction="column" ghost gutter={[0, 8]}>
        <ProCard layout="center" bordered>
          <ProTable<BlogListData>
            columns={columns}
            request={async (params) => {
              const {
                title = '',
                summary = '',
                category = '',
                tags = [],
                current = PageConfig.defaultPageIndex,
                pageSize = PageConfig.defaultPageSize,
              } = params;

              const response = await getBlogList({
                title,
                summary,
                category,
                tags: tags.join('*'),
                pageIndex: current,
                pageSize: pageSize,
              });
              const { data, status, total } = response;

              return Promise.resolve({
                data: data || [],
                success: status,
                total,
              });
            }}
            rowKey={(record) => {
              return `${record._id}`;
            }}
            pagination={{
              defaultCurrent: PageConfig.defaultPageIndex,
              defaultPageSize: PageConfig.defaultPageSize,
              showQuickJumper: true,
            }}
            toolBarRender={() => [<FormComponent />]}
          />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default connect(
  ({
    blogManagement,
    loading,
  }: {
    blogManagement: BlogManagementState;
    loading: Loading;
  }) => ({
    state: blogManagement,
    loading: loading.effects['blogManagement/getBlogList'],
  }),
)(BlogManagement);
