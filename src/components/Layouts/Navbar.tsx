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
  Menu,
  Button
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
import SidebarContent from "./SideBarContent";
import MobileNav from "./NavBarForMobile";
import RightSide from "./RightSide";

export default function Navbar({children} : {children: ReactNode}) {
  const userAuthenticated = useAtomValue(authAtom);
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
      <SidebarContent onClose={() => onClose}></SidebarContent>
      <Stack
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            direction={{ base: "column", md: "row" }}
          >
        <Stack flex={1}>
          
          <RightSide>
            {children}
          </RightSide>
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




