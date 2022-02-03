import './Header.style.scss';

import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BsPencilSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Popover } from 'antd';
import {
  Box,
  Stack,
  Heading,
  Flex,
  Button,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import { KeyAuthModal } from '../AuthModal/AuthModal';
import { UserKeyModal } from '../UserKeyModal/UserKeyModal';
import { PopoverContent } from './HeaderPopoverContent';

import { darkModeState, toggleDarkModeState } from '../../shared/GlobalState';
import { userAuthState, authModalState, keyModalState } from 'src/application/state';

const HeaderNav: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const isDarkModeEnabled = useRecoilValue(darkModeState);
  const [darkMode, toggleDarkMode] = useRecoilState(toggleDarkModeState);
  const [authModalActive, setAuthModalActive] = useRecoilState(authModalState);
  const [isUserAuthenticated] = useRecoilState(userAuthState);
  const [keyModalActive, setKeyModalActive] = useRecoilState(keyModalState);

  const [popoverVisible, setPopoverVisible] = useState({ visible: false });
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  const hidePopover = () => {
    setPopoverVisible({
      visible: false,
    });
  };

  const handleVisibleChange = (visible: boolean) => {
    setPopoverVisible({ visible });
  };

  const handleAuthClick = () => {
    isUserAuthenticated ? navigate('/write') : setAuthModalActive(true);
  };

  useEffect(() => {
    setAuthModalActive(false);
  }, [isUserAuthenticated]);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={3}
      bg="transparent"
      color={isDarkModeEnabled ? 'white' : 'black'}
      w="100%"
      borderBottom="1px"
      pos="relative"
      position="static"
    >
      <Flex align="center" mr={5}>
        <Heading
          color={isDarkModeEnabled ? 'white' : 'black'}
          as="h1"
          size="lg"
          letterSpacing={'tighter'}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          Second Exchange
        </Heading>
      </Flex>

      <Input
        placeholder="Search for profiles"
        style={{
          color: isDarkModeEnabled ? 'white' : 'black',
          marginLeft: '180px',
          width: '450px',
          border: '1px solid #A0AEC2',
          borderRadius: "50px",
          textIndent: "10px"
        }}
      />
      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      ></Stack>
      <Box style={{ marginLeft: '90px' }}>
        <div className="Header__content__dark-mode">
          <label
            htmlFor="dark-mode-select"
            className={`Header__content__dark-mode__label ${
              isDarkModeEnabled ? 'Header__content__dark-mode__label--toggled' : ''
            }`}
          >
            Dark mode:
          </label>
          <input
            id="dark-mode-select"
            className="Header__content__dark-mode__input"
            type="checkbox"
            // @ts-ignore
            value={isDarkModeEnabled}
            // @ts-ignore
            onChange={toggleDarkMode}
          />
        </div>
      </Box>
      <Box style={{ marginLeft: '90px' }}>
        <div className="Header__content__write">
          <button className="Header__content__write-button" onClick={handleAuthClick}>
            <div>
              <BsPencilSquare size={20} />
            </div>
          </button>
          <button
            className="Header__content__write-button-text"
            onClick={handleAuthClick}
            style={{ paddingLeft: '10px' }}
          >
            Post Blog
          </button>
        </div>
      </Box>
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        {isUserAuthenticated && (
          <Popover
            content={<PopoverContent hidePopover={hidePopover} />}
            trigger="click"
            visible={popoverVisible.visible}
            onVisibleChange={handleVisibleChange}
          >
            <Button
              border="1px"
              style={{
                background: 'transparent',
                borderColor: isDarkModeEnabled ? 'white' : 'black',
                color: isDarkModeEnabled ? 'white' : 'black',
                marginLeft: '50px',
              }}
            >
              Connected
            </Button>
          </Popover>
        )}
      </Box>
      {keyModalActive && <UserKeyModal />}
      {authModalActive && <KeyAuthModal />}
    </Flex>
  );
};

export default HeaderNav;
