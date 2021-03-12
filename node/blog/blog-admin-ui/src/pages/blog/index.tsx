import React, { useState } from 'react';
import { Button, message } from 'antd';
import { connect, Loading } from 'umi';
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

const BlogManagement: React.FC<BlogManagementProps> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
  ];

  const FormComponent = (
    <ModalForm
      visible={modalVisible}
      trigger={
        <Button type="primary" onClick={() => setModalVisible(true)}>
          <PlusOutlined />
          新建
        </Button>
      }
      onFinish={async (values: any) => {
        const { id, title, summary, markdownContent } = values;
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
                current = PageConfig.defaultPageIndex,
                pageSize = PageConfig.defaultPageSize,
              } = params;
              const response = await getBlogList({
                title,
                summary,
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
            rowKey="id"
            pagination={{
              defaultCurrent: PageConfig.defaultPageIndex,
              defaultPageSize: PageConfig.defaultPageSize,
              showQuickJumper: true,
            }}
            toolBarRender={() => [FormComponent]}
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
