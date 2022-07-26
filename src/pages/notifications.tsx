import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

type notificationsProps = {};

const notifications: React.FC<notificationsProps> = () => {
  return (
    <>
      <Head>
        <title>Notificatons</title>
      </Head>
      <Flex alignItems="center" justifyContent="center">
        <Heading color="brand.100">In Development</Heading>
      </Flex>
    </>
  );
};
export default notifications;
