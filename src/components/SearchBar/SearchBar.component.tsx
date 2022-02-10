import './SearchBar.style.scss';

import React, { useEffect } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

import { queryName } from '../../external/nostr-tools/nip05';
import { darkModeState } from 'src/shared/GlobalState';
import { profilePostsState, profilePubkeyState } from '@libs/application/state';

export const SearchBar = () => {
  const [profilePubkey, setProfilePubkey] = useRecoilState(profilePubkeyState);
  const isDarkModeEnabled = useRecoilValue(darkModeState);
  const [value, setValue] = React.useState('');
  const navigate = useNavigate();
  let searchingProfile = '';
  const [profilePosts, setProfilePosts] = useRecoilState(profilePostsState);

  useEffect(() => {
    setProfilePubkey(value);
  }, [value]);

  const handleChange = (event: any) => setValue(event.target.value);
  const searchProfile = async (e: any) => {

    searchingProfile = value;
    setProfilePosts([]);
    if (searchingProfile.match(/^[a-f0-9A-F]{64}$/)) {
      console.log('Matched');
      navigate(`/profile/${searchingProfile}`);
      console.log('navigated');
      searchingProfile = '';
      return;
    }

    if (searchingProfile.match(/^([a-z0-9-_.]+@)?[a-z-0-9-_.]+$/)) {
      let pubkey = await queryName(searchingProfile);
      if (pubkey) {
        searchingProfile = '';
        return;
      }
    }
  };

  return (
    <form action="javascript:void(-1)">
      <Input
        placeholder="Search for profiles"
        className={isDarkModeEnabled ? 'search-bar__dark-mode' : 'search-bar'}
        onChange={handleChange}
      />
      <Button onClick={searchProfile} className="search-bar__button">
        <BiSearch size={30} />
      </Button>
    </form>
  );
};
