import React, { useState, useEffect } from 'react';
import { Box, Avatar, Text, Button, Flex, Spinner } from '@chakra-ui/react';

const UserProfileCard = ({ profile, onFollow }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" textAlign="center" m="2">
    <Avatar name={profile.displayName} src={profile.picture} size="xl" mb="3" />
    <Text fontSize="sm" fontWeight="bold" mb="2">{profile.name}</Text>
    <Button colorScheme="blue" onClick={() => onFollow(profile)}>Follow</Button>
  </Box>
);

const UserProfiles = ({ profileData, onFollow }) => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (profileData) {
      setProfiles(profileData.map(data => JSON.parse(data)));
      setIsLoading(false);
    }
  }, [profileData]);

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="70vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex direction="row" wrap="wrap" justifyContent="center" alignItems="center">
      {profiles.map((profile, index) => (
        <UserProfileCard key={index} profile={profile} onFollow={onFollow} />
      ))}
    </Flex>
  );
};

export default UserProfiles;
