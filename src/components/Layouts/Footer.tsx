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
          rel="noreferrer"
          target="_blank"
          href="https://github.com/muellners"
          color={useColorModeValue("brand.100", "brand.200")}
        >
          with the help of Muellners Foundation
          and funded by 
          <a
          rel="noreferrer"
          target="_blank"
          href="https://github.com/cynsar-foundation/second.exchange"
          color={useColorModeValue("brand.100", "brand.200")}
        > Cynsar Foundation</a>
          
        </a>
      </Text>
      <Flex alignItems="center">
        <Text pr="5px" fontSize={{ base: "10px", md: "20px" }}>
          Contribute to Second Exchange on
        </Text>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://github.com/muellners/second.exchange"
        >
          <AiOutlineGithub fontSize="20px" />
        </a>
      </Flex>
      <a rel="noreferrer" target="_blank" href="https://www.netlify.com/">
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
