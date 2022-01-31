import React from 'react';
import { Form } from 'antd';
import { Button, Input, Textarea} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import { darkModeState } from 'src/shared/GlobalState';

import 'antd/dist/antd.css';
import './Writer.style.scss';

export const Writer = () => {
  const isDarkModeEnabled = useRecoilValue(darkModeState);
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className="writer-container">
      <Form name="nest-messages" onFinish={onFinish}>
        <Form.Item name="blog-title">
          <Input placeholder="Blog Title" className="writer__title" style={{ width: "850px"}} />
        </Form.Item>
        <Form.Item name="blog-description">
          <Input className="writer__description" placeholder="Blog Brief Description" />
        </Form.Item>
        <Form.Item name="blog-content">
          <Textarea
            style={{ height: "300px"}}
            size='lg'
            className="writer__content"
            placeholder="Write your blog! (Markdown supported)"
          />
        </Form.Item>
        <Form.Item className="writer-container__fdss">
          <Button
            type="submit"
            style={{
              borderColor: isDarkModeEnabled ? 'white' : 'blue',
              border: '1px solid grey',
              color: isDarkModeEnabled ? 'white' : 'black',
              borderRadius: "3px",
              padding: "10px",
              backgroundColor: "transparent"
            }}
          >
            Publish Blog
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
