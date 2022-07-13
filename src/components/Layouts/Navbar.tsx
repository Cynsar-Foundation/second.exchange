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
} from "@chakra-ui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IoKeySharp, IoNewspaperSharp } from "react-icons/io5";
import { BsBellFill, BsFillChatRightTextFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

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
      <Box
        bg={useColorModeValue("white", "gray.900")}
        px={4}
        borderBottom="1px solid"
        borderColor={useColorModeValue("#cbcbcb", "transparent")}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            onClick={() => router.push("/")}
            cursor="pointer"
          >
            Second Exchange
          </Text>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
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
