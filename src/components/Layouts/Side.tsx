import {
    Box,
    useDisclosure,
    Drawer,
    DrawerContent
  } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import MobileNav from "./NavBarForMobile";
import SidebarContent from './SideBarContent';


  export default function Sidebar({ children }: { children: ReactNode}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
      
    return (
      <>
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
      <Box ml={{ base: 0, md: 60 }}>
        {children}
      </Box>
      </>
    )
  }