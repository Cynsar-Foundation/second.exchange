import { Box, Flex } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import Footer from "./Footer";

import Navbar from "./Navbar";

type MainLayoutProps = {
  children: any;
};

const MainLayout: React.FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
}) => {
  return (
    <Box minHeight="100vh">
      <Navbar />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
