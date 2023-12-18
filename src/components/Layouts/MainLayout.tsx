import { Box, Flex } from "@chakra-ui/react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Footer from "./Footer";
import SideBar from "./Navbar";
import { useNostrSetupService } from "../../service/nostrSetup";
import { useAtom, useAtomValue } from "jotai";
import { ndkAtom } from "../../atoms/ndkAtom";
import { useNostrOpsService } from "../../service/nostrOps";

type MainLayoutProps = {
  children: any;
};

const MainLayout: React.FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
}) => {

  const ndk = useAtomValue(ndkAtom)

  const service = useNostrSetupService()
  const nostrOps = useNostrOpsService()
  const [currentUser, setCurrentUser] = useState(null);



  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (service.isNDKInitialized() || ndk) {
        try {
          const user = await nostrOps.getCurrentUser();
          setCurrentUser(user);
        } catch (error) {
          console.error('Error fetching current user:', error);
          // Handle error appropriately
        }
      }
    };

    fetchCurrentUser();
  }, [ndk, nostrOps, service]);

  let isUserPresent = Boolean(currentUser);
  // Setting user as present
  return (
    <Flex direction="column" minHeight="100vh">
      <Flex flexGrow={1} overflow="hidden">
        <SideBar isUserPresent={isUserPresent} profileName={currentUser}/>
        <Box flex={1} p="10px" overflow="auto" marginLeft="0">
          {children}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
