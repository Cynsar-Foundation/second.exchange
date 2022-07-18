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
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import React from "react";
import { AiFillCopy } from "react-icons/ai";

import { keyModalState } from "../../atoms/keyModalStateAtom";
import { getPrivateKey, getPublicKey } from "../../utils";

const KeyModal: React.FC = () => {
  const [keyModalOpen, setKeyModalOpen] = useAtom(keyModalState);
  const privateKey = getPrivateKey();
  const publicKey = getPublicKey();
  const toast = useToast();

  return (
    <>
      <Modal isOpen={keyModalOpen} onClose={() => setKeyModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Keys</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" rowGap="15px">
              <Text fontWeight="bold">
                Make sure you back up your private key!
              </Text>
              <Text>
                Posts are published using your private key. Others can see your
                posts or follow you using only your public key.
              </Text>
              <Flex flexDirection="column">
                <Text mb="5px">Private Key:</Text>
                <Flex alignItems="center" columnGap="10px">
                  <Input value={privateKey} readOnly />
                  <AiFillCopy
                    onClick={() => {
                      navigator.clipboard.writeText(privateKey);
                      toast({
                        title: "Private Key Copied",
                        status: "success",
                        duration: 500,
                        isClosable: true,
                      });
                    }}
                    cursor="pointer"
                    fontSize="20px"
                  />
                </Flex>
              </Flex>
              <Flex flexDirection="column">
                <Text mb="5px">Public Key:</Text>
                <Flex alignItems="center" columnGap="10px">
                  <Input value={publicKey} readOnly />
                  <AiFillCopy
                    onClick={() => {
                      navigator.clipboard.writeText(publicKey);
                      toast({
                        title: "Public Key Copied",
                        status: "success",
                        duration: 500,
                        isClosable: true,
                      });
                    }}
                    cursor="pointer"
                    fontSize="20px"
                  />
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setKeyModalOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default KeyModal;
