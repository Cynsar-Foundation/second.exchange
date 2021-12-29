import React from "react";
import { Row, Col, List } from "antd";

export const UserCollection = () => {
  const data = [
    {
      Name: "BORED APE #0",
      Image:
        "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    },
    {
      Name: "BORED APE #1",
      Image:
        "https://ipfs.io/ipfs/QmcJYkCKK7QPmYWjp4FD2e3Lv5WCGFuHNUByvGKBaytif4",
    },
    {
      Name: "BORED APE #2",
      Image:
        "https://ipfs.io/ipfs/QmSg9bPzW9anFYc3wWU5KnvymwkxQTpmqcRSfYj7UmiBa7",
    },
    {
      Name: "BORED APE #3",
      Image:
        "https://ipfs.io/ipfs/QmWBgfBhyVmHNhBfEQ7p1P4Mpn7pm5b8KgSab2caELnTuV",
    },
    {
      Name: "BORED APE #4",
      Image:
        "https://ipfs.io/ipfs/QmW1MBApm4XvwgoSKf45ZtsqJU5cDYdcsW2GBSEUqXWE3T",
    },
    {
      Name: "BORED APE #5",
      Image:
        "https://ipfs.io/ipfs/QmeiZs7AWji15fpwTH6fqpZCBSpZpLg8Xn8UKrt4NVkB2y",
    },
    {
      Name: "BORED APE #6",
      Image:
        "https://ipfs.io/ipfs/QmfNyXX3x7HYBpbJseB3pDFvV1W456tYjXxqdsba7WrEuU",
    },
    {
      Name: "BORED APE #7",
      Image:
        "https://ipfs.io/ipfs/QmSdGMvowFxFFHJr3EajE8RNsPpPyKd5mh4yNaZZegPYqn",
    },
    {
      Name: "BORED APE #8",
      Image:
        "https://ipfs.io/ipfs/QmadJMqL3WWr7SdtXzNUEvusy9o3uxedTbCuXNFHQxpsNZ",
    },
  ];
  return (
    <div className="User_collection">
      <Row justify="center">
        <Col span={22}>
          <List
            itemLayout="horizontal"
            size="large"
            grid={{
              gutter: 0,
              column: 6,
            }}
            dataSource={data}
            renderItem={(d, i) => (
              <div key={i} className="Collection_main">
                <img src={d.Image} alt={d.Image} />
                <p>{d.Name}</p>
              </div>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};
