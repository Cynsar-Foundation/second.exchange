import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { ReactElement } from "react";
import { IconType } from "react-icons/lib";

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactElement;
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
  
export default NavItem