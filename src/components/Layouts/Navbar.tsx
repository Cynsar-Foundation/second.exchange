import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HamburgerIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { AiTwotonePlusCircle } from "react-icons/ai";

const SideBar = ({ isUserPresent, profileName }: any) => {
  const router = useRouter();
  const isWritePage = router.pathname === "/write";
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const userBarWidth = "51.2px"; // 20% of 256px
  const drawerWidth = "204.8px"; // 80% of 256px
  const handleClick = () => {
    // Logic to open the "Write" component goes here
    // For example, changing a state or using a router to navigate
    router.push("/write");
  };
  return (
    <Flex height="100vh" position="relative">
      {/* User Sidebar */}

      <Box
        width={userBarWidth}
        bg={isUserPresent ? "white" : "gray.200"}
        p={2}
        textAlign="center"
        zIndex={2} // Higher z-index to keep it on top
      >
        {isUserPresent ? (
          <>
            {/* Avatar acting as a button */}
            <Button
              onClick={onToggle}
              variant="unstyled" // Make it blend in, remove button styling
              p={0} // Remove padding to avoid increasing the area unnecessarily
            >
              <Avatar name={profileName.name} size="sm" />
            </Button>
          </>
        ) : (
          <Text fontSize="sm">No User</Text>
        )}
      </Box>

      {/* Drawer */}
      {isUserPresent && isOpen && (
        <>
          <Drawer isOpen={isOpen} placement="left" onClose={onToggle}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">
                {/* Place your header content here */}
                <Avatar name={profileName.name} size="lg" />
                <Text fontSize="lg" mt={4}>
                  {profileName.name}
                </Text>
              </DrawerHeader>

              <DrawerBody>
                {/* Your drawer's body content */}
                {/* Add more buttons or content as needed */}
                <Button
                  colorScheme="blue"
                  w="100%"
                  mb={4}
                  onClick={handleClick}
                >
                  Post
                </Button>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}

      {/* Main Content Area */}
    </Flex>
  );
};

export default SideBar;
