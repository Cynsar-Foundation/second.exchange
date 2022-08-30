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
import { useRouter } from "next/router";

import { authAtom } from "../../atoms/authStateAtom";
import { authModalState } from "../../atoms/authModalStateAtom";
import AuthModal from "../Modals/AuthModal";
import KeyModal from "../Modals/KeyModal";
import { keyModalState } from "../../atoms/keyModalStateAtom";
import { AiOutlineMenu } from "react-icons/ai";
import { GoPlus } from "react-icons/go";

export default function Navbar() {
  const userAuthenticated = useAtomValue(authAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const setAuthModalOpen = useSetAtom(authModalState);
  const setKeyModalOpen = useSetAtom(keyModalState);
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
            <Text
              display={{ base: "none", lg: "flex", md: "flex" }}
              cursor="pointer"
            >
              Second Exchange
            </Text>
            <Text
              pl={{ base: "20px" }}
              cursor="pointer"
              display={{ base: "flex", lg: "none", md: "none" }}
            >
              SE
            </Text>
          </Text>
          <Flex>
            <InputGroup>
              <InputRightElement pointerEvents="none" children={<BsSearch />} />
              <Input
                placeholder="Search for profiles"
                borderRadius="xl"
                borderColor="gray.400"
                width={{ base: "180px", md: "300px", lg: "450px" }}
                fontSize={{ base: "12px", lg: "16px", md: "16px" }}
              />
            </InputGroup>
          </Flex>
          <Flex alignItems={"center"}>
            <Flex direction={"row"} gap={7}>
              <Button
                display={{ base: "none", lg: "flex", md: "flex" }}
                alignItems="center"
                cursor="pointer"
                onClick={() => {
                  userAuthenticated
                    ? router.push("/write")
                    : setAuthModalOpen(true);
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
                  border={{ base: "none", md: "1px solid #cbcbcb" }}
                  borderRadius="lg"
                  _hover={{ border: "1px solid transparent" }}
                >
                  <Flex
                    alignItems="center"
                    display={{ lg: "flex", md: "flex", base: "none" }}
                  >
                    {userAuthenticated ? "Connected" : "Connect"}
                    <ChevronDownIcon fontSize="20px" />
                  </Flex>
                  <Flex
                    alignItems="center"
                    display={{ lg: "none", md: "none", base: "flex" }}
                  >
                    <AiOutlineMenu fontSize="20px" />
                  </Flex>
                </MenuButton>
                {!userAuthenticated ? (
                  <MenuList alignItems="center">
                    <MenuItem
                      display="flex"
                      onClick={() => setAuthModalOpen(true)}
                    >
                      <BiLogIn fontSize="20px" />
                      <Text pl="10px">Login</Text>
                    </MenuItem>
                  </MenuList>
                ) : (
                  <MenuList alignItems="center">
                    <MenuItem
                      display="flex"
                      onClick={() => router.push("/myposts")}
                    >
                      <IoNewspaperSharp fontSize="20px" />
                      <Text pl="10px" cursor="pointer">
                        My Posts
                      </Text>
                    </MenuItem>
                    <MenuItem
                      display="flex"
                      onClick={() => router.push("/write")}
                    >
                      <GoPlus fontSize="20px" />
                      <Text pl="10px" cursor="pointer">
                        Create Post
                      </Text>
                    </MenuItem>
                    <MenuItem
                      display="flex"
                      onClick={() => router.push("/messages")}
                    >
                      <BsFillChatRightTextFill fontSize="20px" />
                      <Text pl="10px" cursor="pointer">
                        My Chats
                      </Text>
                    </MenuItem>
                    <MenuItem
                      display="flex"
                      onClick={() => router.push("/notifications")}
                    >
                      <BsBellFill fontSize="20px" />
                      <Text pl="10px" cursor="pointer">
                        Notifications
                      </Text>
                    </MenuItem>
                    <MenuItem
                      display="flex"
                      onClick={() => setKeyModalOpen(true)}
                    >
                      <IoKeySharp fontSize="20px" />
                      <Text pl="10px" cursor="pointer">
                        My Keys
                      </Text>
                    </MenuItem>
                    <MenuItem
                      display="flex"
                      onClick={() => router.push("/settings")}
                    >
                      <IoMdSettings fontSize="20px" />
                      <Text pl="10px" cursor="pointer">
                        Settings
                      </Text>
                    </MenuItem>
                    <MenuItem
                      display="flex"
                      onClick={() => setAuthModalOpen(true)}
                    >
                      <BiLogOut fontSize="20px" />
                      <Text pl="10px" cursor="pointer">
                        Logout
                      </Text>
                    </MenuItem>
                  </MenuList>
                )}
              </Menu>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <AuthModal />
      <KeyModal />
    </>
  );
}
