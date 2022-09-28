import { Flex, HStack, useColorModeValue, IconButton, Box, Button, useColorMode, Menu, 
    MenuButton, Avatar, VStack, Text, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAtomValue, useSetAtom } from "jotai";
import { authAtom } from "../../atoms/authStateAtom";
import { BiLogIn } from "react-icons/bi";
import { authModalState } from "../../atoms/authModalStateAtom";

export default function RightSide({ children }: {children: ReactNode}) {
    const { colorMode, toggleColorMode } = useColorMode();
    const userAuthenticated = useAtomValue(authAtom);
    const setAuthModalOpen = useSetAtom(authModalState);

    return(
        <>
        <Flex
                ml={{ base: 0, md: 60 }}
                px={{ base: 4, md: 4 }}
                height="20"
                alignItems="center"
                bg={useColorModeValue('white', 'gray.900')}
                borderBottomWidth="1px"
                position="static"
                borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
                justifyContent={{ base: 'space-between', md: 'flex-end' }}>
  
          <HStack spacing={{ base: '0', md: '6' }}>

          <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Box display={{ base: 'none', md: 'flex' }}>
                <Button
                onClick={toggleColorMode}
                display={{ base: "none", lg: "flex", md: "none" }}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
                </Box>
             
        <Flex alignItems={'center'}>
          {!userAuthenticated ? (
            <Menu>
              <MenuButton py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
                 <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Anon</Text>
                  <Text fontSize="xs" color="gray.600">
                  {userAuthenticated ? "Connected" : "Connect"}
                  </Text>
                </VStack>
                
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
              </MenuButton>
              <MenuList bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem onClick={() => setAuthModalOpen(true)}> Connect your keys
                </MenuItem>
                </MenuList>
              </Menu>
          ): (
            <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                  {userAuthenticated ? "Connected" : "Connect"}
                  </Text>
                </VStack>
                
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
          )}
        </Flex>

          </HStack>
          </Flex>
        </>
    )
}