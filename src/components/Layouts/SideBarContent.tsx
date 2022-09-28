import { Box, Text, useColorModeValue, Flex, BoxProps, CloseButton } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { authAtom } from "../../atoms/authStateAtom";
import LinkItems  from './LinkItem'
import NavItem from './NavBarItem'
import SidebarProps from "./SideBarProps";
  
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

  export default SidebarContent;