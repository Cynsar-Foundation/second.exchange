import { Col, Row } from "antd";
import React, { FC } from "react";

interface IProps {
  posts: any;
}

export const PostTile: FC<IProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post: any) => (
        <div className="card">
          <Row>
            <Col span={5} className="post-img-main">
              <img
                src="https://www.akamai.com/content/dam/site/im-demo/perceptual-standard.jpg?imbypass=true"
                alt="image"
                className="post-img"
              />
            </Col>
            <Col span={19}>
              <div className="post-main">
                <p>{post["content"]}</p>
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};
