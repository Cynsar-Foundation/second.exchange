import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { AiOutlineGithub } from "react-icons/ai";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <Box
      borderTop="0.5px solid"
      borderColor={useColorModeValue("#cbcbcb", "brand.100")}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      rowGap="5px"
      position="absolute"
      bottom={0}
      width="100%"
      p="5px"
    >
      <Text>
        Made at{" "}
        <a
          href="https://github.com/muellners"
          color={useColorModeValue("brand.100", "brand.200")}
        >
          Muellners Foundation
        </a>
      </Text>
      <Flex alignItems="center">
        <Text pr="5px" fontSize="20px">
          Contribute to Second Exchange on
        </Text>
        <a href="https://github.com/muellners/second.exchange">
          <AiOutlineGithub fontSize="20px" />
        </a>
      </Flex>
      <a href="https://www.netlify.com/">
        <Text
          cursor="pointer"
          textDecoration="underline"
          color={useColorModeValue("brand.100", "brand.200")}
        >
          This site is powered by Netlify
        </Text>
      </a>
    </Box>
  );
};
export default Footer;
