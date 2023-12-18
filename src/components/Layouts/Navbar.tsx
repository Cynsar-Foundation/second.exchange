import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button
} from '@chakra-ui/react';

const SideBar = ({ isUserPresent, profileName  }: any) => {
  
  const userBarWidth = "51.2px"; // 20% of 256px
  const drawerWidth = "204.8px"; // 80% of 256px

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
            <Avatar name={profileName.name} size="sm" />
            <Text fontSize="sm" mt={2}>
              {}
            </Text>
          </>
        ) : (
          <Text fontSize="sm">No User</Text>
        )}
      </Box>

      {/* Drawer */}
      {isUserPresent && (
        <Box
          width={drawerWidth}
          bg="lightslategrey" // Light color for the drawer
          p={4}
          left={userBarWidth}
          top={0}
          bottom={0}
          zIndex={1} // Lower z-index to be behind the main content
        > 
         <Avatar name={profileName.name} size="lg" placeContent={'centre'}/>
          <Text fontSize="lg" mb={4}>{profileName.name}</Text>
          <Button colorScheme="blue" w="100%" mb={4}>
            Post
          </Button>
          {/* Add more buttons or content as needed */}
        </Box>
      )}

      {/* Main Content Area */}

    </Flex>
  );
};

export default SideBar;
