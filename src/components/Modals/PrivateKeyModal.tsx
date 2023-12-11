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
import ReturnFocus from "./AfterPrivateKey";
import { useNostrSetupService } from "../../service/nostrSetup";



const PrivateKeyModal = ({ contentRef }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [showReturnFocusModal, setShowReturnFocusModal] = useState(false); // State // State to control ReturnFocus
  const { colorMode } = useColorMode();
  const nostrService = useNostrSetupService();


  useEffect(() => {
    if (!nostrService.isNDKInitialized()){
      // checking local 
      if (!nostrService.checkLocalStorage()){
        setShowModal(true);
      }
    }
  }, [nostrService]);

  useEffect(() => {
    const contentEl = contentRef.current;
    if ((showModal || showReturnFocusModal)&& contentEl) {
      contentEl.classList.add("blur-background");
    } else if (contentEl){
      contentEl.classList.remove("blur-background");
    }
    return () => {
      if (contentEl){
        contentEl.classList.remove("blur-background");
      }
    };
  }, [showModal, showReturnFocusModal, contentRef]);

  const handleOk = () => {
    setShowModal(false);
    // Additional actions (like redirection) can be added here.
    setShowReturnFocusModal(true);
  };

  const handleCloseReturnFocus = () => {
    setShowReturnFocusModal(false); // Close ReturnFocus modal
  };

  return (
    <>
    <Modal
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    closeOnOverlayClick={false}
    isCentered={true}
    colorScheme={colorMode === "light" ? "dark" : "light"}
  >
    <ModalOverlay />
    <ModalContent
      display="flex"
      flexDirection="column"
      alignItems="center"
      ml={["0", "25%", "30%", "35%"]} // Adjusting for responsive design
    >
      <ModalHeader>No Key Found</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        The required private key was not found in local storage.
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={handleOk}>
          Ok, create my keys
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  <ReturnFocus isOpen={showReturnFocusModal} onClose={handleCloseReturnFocus} />
  </>
  );
};

export default PrivateKeyModal;
