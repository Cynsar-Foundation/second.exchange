import React from 'react';
import { Form } from 'antd';
import { Button, Input, Textarea} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { inject } from 'njct';
import { useNavigate } from 'react-router-dom';

import { darkModeState } from 'src/shared/GlobalState';
import { NostrEvent, RelayService } from 'src/application/interfaces';
import { sessionKeyState } from 'src/application/state';

import 'antd/dist/antd.css';
import './Writer.style.scss';

export const Writer = () => {
  const isDarkModeEnabled = useRecoilValue(darkModeState);
  const sessionKey = useRecoilValue(sessionKeyState);
  // @ts-ignore
  const parsedSessionKey = JSON.parse(sessionKey)
  const relayService: RelayService = inject('relayservice');
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const {
      blog_title,
      blog_description,
      blog_content
     } = values;
    const event: NostrEvent = {
      pubkey: parsedSessionKey['pubKey'],
      created_at: Math.round(Date.now() / 1000),
      kind: 1,
      tags: [],
      content: blog_title + blog_description + blog_content,
    }

    relayService.publish(event);
    navigate('/');
  };

  return (
    <div className="writer-container">
      <Form name="nest-messages" onFinish={onFinish}>
        <Form.Item name="blog_title">
          <Input placeholder="Blog Title" className="writer__title" style={{ width: "850px", color: (isDarkModeEnabled ? "white" : "black")}} />
        </Form.Item>
        <Form.Item name="blog_description">
          <Input className="writer__description" placeholder="Blog Brief Description" style={{ color: (isDarkModeEnabled ? "white" : "black")}} />
        </Form.Item>
        <Form.Item name="blog_content">
          <Textarea
            style={{ height: "300px" , color: (isDarkModeEnabled ? "white" : "black") }}
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
              border: '1px solid',
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
