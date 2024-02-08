import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Flex, Button, useColorModeValue } from "@chakra-ui/react";

const CustomEditorNoSSR = dynamic(
  () => import("../components/Editor/CustomEditor"),
  {
    ssr: false, // Disable server-side rendering
  }
);

export default function EditorPage() {
  const [data, setData] = useState();
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Flex direction="column" minH="100vh">
      <Flex justify="flex-end" p={4}>
        <Button colorScheme="blue" onClick={() => console.log("Publishing...")}>
          Publish
        </Button>
      </Flex>
      <Box flex="1" bg={bgColor}>
        <CustomEditorNoSSR data={data} onChange={setData} />
      </Box>
    </Flex>
  );
}
