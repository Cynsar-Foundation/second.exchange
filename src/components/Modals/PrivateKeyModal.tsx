// PrivateKeyModal.jsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { checkPrivateKey } from "../../utils/checkPrivateKey";

const checkPrivKey = (setShowModal: any) => {
  const privKey = checkPrivateKey()
  if (!privKey) {
    setShowModal(true); // Display UI modal
  }
  return privKey;
};

const PrivateKeyModal = ({ contentRef }: any) => {
  const [showModal, setShowModal] = useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    checkPrivKey(setShowModal);
  }, []);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (showModal && contentEl) {
      contentEl.classList.add("blur-background");
    } else if (contentEl){
      contentEl.classList.remove("blur-background");
    }
    return () => {
      if (contentEl){
        contentEl.classList.remove("blur-background");
      }
    };
  }, [showModal, contentRef]);

  const handleOk = () => {
    setShowModal(false);
    // Additional actions (like redirection) can be added here.
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      closeOnOverlayClick={false}
      isCentered={true}
      colorScheme={colorMode === "light" ? "dark" : "light"}
    >
      <ModalOverlay />
      <ModalContent ml={["0", "25%", "30%", "35%"]}>  {/* Adjusting for responsive design */}
        <ModalHeader>No Key Found</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          The required private key was not found in local storage.
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleOk}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PrivateKeyModal;
