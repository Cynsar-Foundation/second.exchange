/* eslint-disable react/no-children-prop */
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IoKeySharp, IoNewspaperSharp } from "react-icons/io5";
import { BsBellFill, BsFillChatRightTextFill, BsSearch } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { useAtomValue, useSetAtom } from "jotai";
import { RiPencilRulerFill } from "react-icons/ri";

import { authAtom } from "../../atoms/authStateAtom";
import { authModalState } from "../../atoms/authModalStateAtom";
import AuthModal from "../Modals/AuthModal";
import { useRouter } from "next/router";

export default function Navbar() {
  const userAuthenticated = useAtomValue(authAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const setModalOpen = useSetAtom(authModalState);
  const router = useRouter();

  return (
    <>
      <Box bg={useColorModeValue("white", "gray.900")} px={{ base: 2, lg: 4 }}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          borderBottom="1px solid"
          borderColor={useColorModeValue("#cbcbcb", "transparent")}
        >
          <Text
            fontSize={{ lg: "2xl", md: "xl", base: "md" }}
            fontWeight="bold"
            onClick={() => router.push("/")}
            cursor="pointer"
          >
            Second Exchange
          </Text>
          <Flex>
            <InputGroup>
              <InputRightElement pointerEvents="none" children={<BsSearch />} />
              <Input
                placeholder="Search for profiles"
                borderRadius="xl"
                borderColor="gray.400"
                width={{ base: "130px", md: "300px", lg: "450px" }}
                fontSize={{ base: "12px", lg: "16px", md: "16px" }}
              />
            </InputGroup>
          </Flex>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button
                display={{ base: "none", lg: "flex", md: "flex" }}
                alignItems="center"
                cursor="pointer"
                onClick={() => {
                  userAuthenticated
                    ? router.push("/write")
                    : setModalOpen(true);
                }}
              >
                <RiPencilRulerFill />
                <Text cursor="pointer" pl="5px">
                  Post Blog
                </Text>
              </Button>
              <Button
                onClick={toggleColorMode}
                display={{ base: "none", lg: "flex", md: "flex" }}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton
                  cursor="pointer"
                  minW={0}
                  p="5px 10px 5px 10px"
                  border="1px solid #cbcbcb"
                  borderRadius="lg"
                  _hover={{ border: "1px solid transparent" }}
                >
                  <Flex alignItems="center">
                    {userAuthenticated ? "Connected" : "Connect"}
                    <ChevronDownIcon fontSize="20px" />
                  </Flex>
                </MenuButton>
                {!userAuthenticated ? (
                  <MenuList alignItems="center">
                    <MenuItem display="flex" onClick={() => setModalOpen(true)}>
                      <BiLogIn fontSize="20px" />
                      <Text pl="10px">Login</Text>
                    </MenuItem>
                  </MenuList>
                ) : (
                  <MenuList alignItems="center">
                    <MenuItem display="flex">
                      <IoNewspaperSharp fontSize="20px" />
                      <Text pl="10px">My Posts</Text>
                    </MenuItem>
                    <MenuItem display="flex">
                      <BsFillChatRightTextFill fontSize="20px" />
                      <Text pl="10px">My Chats</Text>
                    </MenuItem>
                    <MenuItem display="flex">
                      <BsBellFill fontSize="20px" />
                      <Text pl="10px">Notifications</Text>
                    </MenuItem>
                    <MenuItem display="flex">
                      <IoKeySharp fontSize="20px" />
                      <Text pl="10px">My Keys</Text>
                    </MenuItem>
                    <MenuItem display="flex">
                      <IoMdSettings fontSize="20px" />
                      <Text pl="10px">Settings</Text>
                    </MenuItem>
                    <MenuItem display="flex">
                      <BiLogOut fontSize="20px" />
                      <Text pl="10px">Logout</Text>
                    </MenuItem>
                  </MenuList>
                )}
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <AuthModal />
    </>
  );
}
