import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Input,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { authModalState } from "../../atoms/authModalStateAtom";

const AuthModal: React.FC = () => {
  const [modalOpen, setModalOpen] = useAtom(authModalState);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Modal isOpen={modalOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Initial Key Setup</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Type your private key from a previous Nostr account or generate a
            new one.
          </Text>
          <Text mt="10px">
            You can also type just a public key and later sign events manually
            or using a Nostr-capable browser extension.
          </Text>
          <Input mt="15px" placeholder="Private key or Public key" />
        </ModalBody>
        <ModalFooter>
          <Button variant="solid">Generate</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
