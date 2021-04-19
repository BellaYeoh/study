import React, { useEffect } from 'react';
import { Form, message } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { EditBlogProps } from './EditBlog.d';
import { addBlog, AddBlogParams } from './service';
import { responseChecker } from '@/utils';

const { Group } = ProForm;

const EditBlog: React.FC<EditBlogProps> = (props) => {
  const {
    dispatch,
    state: {
      id,
      title,
      tags,
      category,
      summary,
      markdownContent,
      tagList,
      categoryList,
    },
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'editBlog/getInitData',
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      title,
      tags,
      category,
      summary,
      markdownContent,
    });
  }, [title, tags, category, summary, markdownContent]);

  return (
    <ProForm
      form={form}
      initialValues={{
        title,
        tags,
        category,
        summary,
        markdownContent,
      }}
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
      }}
    >
      <Group>
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
      </Group>
      <Group>
        <ProFormTextArea
          name="markdownContent"
          width="lg"
          label="文章内容"
          placeholder="请输入文章内容"
        />
      </Group>
    </ProForm>
  );
};

export default EditBlog;
