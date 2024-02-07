import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

const CustomEditorNoSSR = dynamic(
  () => import("../components/Editor/CustomEditor"),
  {
    ssr: false, // Disable server-side rendering
  }
);

export default function EditorPage() {
  const [data, setData] = useState();
  const bgColor = useColorModeValue("white", "gray.700");
  return <CustomEditorNoSSR data={data} onChange={setData} />;
}
