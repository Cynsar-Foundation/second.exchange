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
import { followModalState } from "../../atoms/followModalAtom";

const FollowModal: React.FC = () => {
  const [followModalOpen, setFollowModalOpen] = useAtom(followModalState);
  const [followList, setFollowList] = useState([]);
  const [userId, setUserId] = useState("");
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const arr = localStorage.getItem("follow-list")
      ? [
          JSON.parse(
            JSON.stringify(localStorage.getItem("follow-list")) || "{}"
          ),
        ] || []
      : [];
    console.log(typeof arr);
    arr.length > 0 &&
      arr.map(
        (
          item: string // @ts-ignore
        ) => setFollowList((current: string[]) => [...current, item])
      );
  }, []);

  const addUserId = () => {
    if (userId.match(/^[a-f0-9A-F]{64}$/)) {
      // @ts-ignore
      setFollowList((prev) => [...prev, userId]);
      const newFollowList = [...followList, userId];
      localStorage.setItem("follow-list", JSON.stringify(newFollowList));
      return;
    }
  };

  const removeUserId = () => {};

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
                    <ListItem mb="5px" color="gray.400" key={item}>
                      {item}
                    </ListItem>
                  ))
                : "Not following anyone yet"}
            </UnorderedList>
            <Flex mt="15px" alignItems="center" columnGap="5px">
              <Input
                type="text"
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
