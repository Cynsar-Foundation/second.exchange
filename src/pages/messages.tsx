import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

type messagesProps = {};

const messages: React.FC<messagesProps> = () => {
  return (
    <>
      <Head>
        <title>Messages</title>
      </Head>
      <Flex alignItems="center" justifyContent="center">
        <Heading color="brand.100">In Development</Heading>
      </Flex>
    </>
  );
};

export default messages;
