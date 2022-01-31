/* eslint-disable prettier/prettier */
import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import 'antd/dist/antd.css';
import './Writer.style.scss';

/* eslint-disable no-template-curly-in-string */

export const Writer = () => {

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className='writer-container'>
    <Form name="nest-messages" onFinish={onFinish}>
      <Form.Item
        name="blog-title"
      >
        <Input
          placeholder='Blog Title'
          className='writer__title'
        />
      </Form.Item>
      <Form.Item
        name="blog-description"
      >
        <Input 
          className='writer__description'
          placeholder='Blog Brief Description'
        />
      </Form.Item>
      <Form.Item
        name="blog-content"
      >
        <Input.TextArea
          autoSize={ {minRows: 12, maxRows: 25} }
          className='writer__content'
          placeholder='Write your blog! (Markdown supported)'
        />
      </Form.Item>
      <Form.Item className="writer-container__fdss">
        <Button type="primary" htmlType="submit">
          Publish Blog
        </Button>
      </Form.Item>
    </Form>
      </div>
  );
};
