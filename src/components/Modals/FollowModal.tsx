import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Text,
  Input,
  useToast,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { followListState } from "../../atoms/followListAtom";
import { followModalState } from "../../atoms/followModalAtom";

const FollowModal: React.FC = () => {
  const [followModalOpen, setFollowModalOpen] = useAtom(followModalState);
  const [followListStatus, setFollowListStatus] = useAtom(followListState);
  const [followList, setFollowList] = useState<string[]>([]);
  const [userId, setUserId] = useState("");
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const arr = localStorage.getItem("follow-list")
      ? JSON.parse(localStorage.getItem("follow-list") || "{}") || []
      : [];
    arr.length > 0 &&
      arr.map(
        (
          item: string // @ts-ignore
        ) => setFollowList((current: string[]) => [...current, item])
      );
  }, []);

  const addUserId = () => {
    if (userId.match(/^[a-f0-9A-F]{64}$/)) {
      // Add check for existing
      if (followList.includes(userId)) {
        toast({
          title: "Already following the user",
          duration: 1500,
          status: "warning",
          isClosable: true,
        });
        return;
      }
      // @ts-ignore
      setFollowList((prev) => [...prev, userId]);
      const newFollowList = [...followList, userId];
      localStorage.setItem("follow-list", JSON.stringify(newFollowList));
      setUserId("");
      toast({
        title: "User added to follow list!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setFollowListStatus(!followListStatus);
    }
  };

  const removeUserId = (userId: string) => {
    if (!followList || followList.length === 0 || followList === null) return;
    let newFollowList = [...followList];
    let index = newFollowList.indexOf(userId);
    if (index !== -1) {
      newFollowList.splice(index, 1);
    }
    setFollowList(newFollowList);
    localStorage.setItem("follow-list", JSON.stringify(newFollowList));
    toast({
      title: "User unfollowed",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    setFollowListStatus(!followListStatus);
  };

  return (
    <>
      <Modal isOpen={followModalOpen} onClose={() => setFollowModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add users to your follow list</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="10px">Folowing:</Text>
            <UnorderedList>
              {followList && followList.length > 0
                ? followList.map((item) => (
                    <Flex key={item} alignItems="center" mb="10px">
                      <ListItem color="gray.400" maxW="300px">
                        {item}
                      </ListItem>
                      <Button
                        variant="ghost"
                        color="red.400"
                        onClick={() => removeUserId(item)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  ))
                : "Not following anyone yet"}
            </UnorderedList>
            <Flex mt="15px" alignItems="center" columnGap="5px">
              <Input
                type="text"
                value={userId}
                onKeyDown={(event) => {
                  if (event.key === "Enter") addUserId();
                }}
                onChange={(event) => setUserId(event.target.value)}
              />
              <Button onClick={() => addUserId()}>Add User</Button>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setFollowModalOpen(false);
                router.reload();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FollowModal;
