import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

type settingsProps = {};

const settings: React.FC<settingsProps> = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Flex alignItems="center" justifyContent="center">
        <Heading color="brand.100">In Development</Heading>
      </Flex>
    </>
  );
};
export default settings;
