/* eslint-disable react/no-children-prop */
import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
  CloseButton,
  useColorMode,
  Text,
  Input,
  MenuButton,
  useDisclosure,
  MenuItem,
  FlexProps,
  MenuDivider,
  Icon,
  Avatar,
  VStack,
  Link,
  BoxProps,
  Drawer,
  MenuList,
  DrawerContent,
  IconButton,
  Spacer,
  Container,
  Stack,
  Menu
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiChevronDown,
  FiStar,
  FiSettings,
  FiMenu,
  FiEdit,
  FiBell
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
  { name: 'Write', icon: FiEdit, where: 'write' },
  { name: 'Trending', icon: FiTrendingUp , where: 'trend'},
  { name: 'Explore', icon: FiCompass, where: 'explore' },
  { name: 'Favourites', icon: FiStar,  where: 'fav' },
  { name: 'Settings', icon: FiSettings, where: 'set' }
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
      <Container maxW={"6xl"} > 
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
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
      <Stack
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            direction={{ base: "column", md: "row" }}
          >
        <Stack
          flex={1} 
        >
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
        <Flex alignItems={'center'}>
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
                    Admin
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
        </Flex>

          </HStack>
          </Flex>
        </Stack>
      </Stack>
      <AuthModal />
      <KeyModal />
      {followModalOpen && <FollowModal />}
      </Box>
      </Container>
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  // This is really 
  const router = useRouter()
  const userAuthenticated = useAtomValue(authAtom);
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
        <NavItem key={link.name} icon={link.icon} where={link.where}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  where: string;
}
const NavItem = ({ icon, children, where, ...rest }: NavItemProps) => {
  // For now this, but for better repurposing we are moving this to a core service such as AUTH(())
  return (
    <Link href={where} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
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
        2nd.Sexchange
      </Text>
    </Flex>
  );
};
