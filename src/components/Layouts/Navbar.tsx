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
  CloseButton,
  useColorMode,
  Text,
  Input,
  useDisclosure,
  FlexProps,
  Icon,
  Link,
  BoxProps,
  Drawer,
  DrawerContent,
  IconButton
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IoKeySharp, IoNewspaperSharp } from "react-icons/io5";
import { BsBellFill, BsFillChatRightTextFill, BsSearch } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { RiPencilRulerFill } from "react-icons/ri";
import { Router, useRouter } from "next/router";

import { authAtom } from "../../atoms/authStateAtom";
import { authModalState } from "../../atoms/authModalStateAtom";
import AuthModal from "../Modals/AuthModal";
import KeyModal from "../Modals/KeyModal";
import { keyModalState } from "../../atoms/keyModalStateAtom";
import { AiOutlineMenu } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { FaUserPlus } from "react-icons/fa";
import { ReactNode, useState } from "react";
import { followModalState } from "../../atoms/followModalAtom";
import FollowModal from "../Modals/FollowModal";
import { IconType } from "react-icons/lib";
import { ReactText } from 'react';

interface LinkItemProps {
  name: String,
  icon: IconType,
  where: string
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome,  where: '/' },
  { name: 'Trending', icon: FiTrendingUp , where: 'trend'},
  { name: 'Explore', icon: FiCompass, where: 'explore' },
  { name: 'Favourites', icon: FiStar,  where: 'fav' },
  { name: 'Settings', icon: FiSettings, where: 'set' },
];

export default function Navbar({children} : {children: ReactNode}) {
  const userAuthenticated = useAtomValue(authAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const setAuthModalOpen = useSetAtom(authModalState);
  const setKeyModalOpen = useSetAtom(keyModalState);
  const [followModalOpen, setFollowModalOpen] = useAtom(followModalState);
  const router = useRouter();
  const [inputProfile, setInputProfile] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigateToUserProfile = () => {
    const profileId = inputProfile.trim().toLowerCase();
    if (profileId.match(/^[a-f0-9A-F]{64}$/)) {
      router.push("/user/" + profileId);
      setInputProfile("");
      return;
    }
  };

  return (
    <>
      <Box minH={'100vh'} bg={useColorModeValue("white", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          borderBottom="1px solid"
          borderColor={useColorModeValue("#cbcbcb", "transparent")}
        >
          <Flex columnGap="5px" alignItems="center">
            <Input
              onChange={(event) => setInputProfile(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") navigateToUserProfile();
              }}
              placeholder="Search for profiles"
              borderRadius="xl"
              borderColor="gray.400"
              width={{ base: "180px", md: "300px", lg: "450px" }}
              fontSize={{ base: "12px", lg: "16px", md: "16px" }}
            />
            <BsSearch
              fontSize="20px"
              cursor="pointer"
              onClick={() => navigateToUserProfile()}
            />
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
                onClick={() => setFollowModalOpen(true)}
                display={{ base: "none", lg: "flex", md: "none" }}
              >
                <FaUserPlus />
                <Text cursor="pointer" pl="5px">
                  Add User
                </Text>
              </Button>
              <Button
                onClick={toggleColorMode}
                display={{ base: "none", lg: "flex", md: "none" }}
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
      {followModalOpen && <FollowModal />}
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const router = useRouter()
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" onClick={() => router.push("/")}>
          2nd.Xchange
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
