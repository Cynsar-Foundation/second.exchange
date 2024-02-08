import { Box, Flex } from "@chakra-ui/react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Footer from "./Footer";
import SideBar from "./Navbar";
import { useNostrSetupService } from "../../service/nostrSetup";
import { useAtom, useAtomValue } from "jotai";
import { ndkAtom } from "../../atoms/ndkAtom";
import { useNostrOpsService } from "../../service/nostrOps";

type MainLayoutProps = {
  children: React.ReactNode; // Better typing for children
};

const MainLayout: React.FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
}) => {
  const ndk = useAtomValue(ndkAtom);
  const service = useNostrSetupService();
  const nostrOps = useNostrOpsService();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (service.isNDKInitialized() || ndk) {
        try {
          const user = await nostrOps.getCurrentUser();
          setCurrentUser(user);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      }
    };

    fetchCurrentUser();
  }, [ndk, nostrOps, service]);

  let isUserPresent = Boolean(currentUser);

  return (
    <Flex direction="column" minHeight="100vh">
      {/* Header or Navbar can be placed here */}

      <Flex flex="1" direction={{ base: "column", md: "row" }}>
        <SideBar isUserPresent={isUserPresent} profileName={currentUser} />

        {/* Main content area */}
        <Box flex="1" p="4">
          {children}
        </Box>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default MainLayout;
