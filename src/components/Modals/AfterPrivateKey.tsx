import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Input,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import { useNostrSetupService } from '../../service/nostrSetup';
import NostrOpsService, { useNostrOpsService } from '../../service/nostrOps';
import { useAtomValue } from 'jotai';
import { ndkAtom } from '../../atoms/ndkAtom';

function ReturnFocus({ isOpen, onClose }: any) {
  const finalRef = React.useRef(null);
  const toast = useToast();
  const nostrService = useNostrSetupService();
  const nostrOpsServices = useNostrOpsService()
  const ndk = useAtomValue(ndkAtom)
  const [displayName, setDisplayName] = useState('');
  const [keysGenerated, setKeysGenerated] = useState(false);
  

  useEffect(() => {
    const useNdk = ndk;
    if (nostrService.isNDKInitialized() && keysGenerated) {
      const pubKey = useNdk?.activeUser
      if (pubKey?.npub) {
        nostrOpsServices.updateAndPublishUserProfile(displayName, nostrService.getNDK(), pubKey.npub);
        onClose(); // Close the modal
        toast({
          title: "Success",
          description: "Keys are generated, stored, and user profile updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true
        });
        setKeysGenerated(false); // Reset the flag
      }
    }
  }, [nostrService, ndk, displayName, keysGenerated, onClose, nostrOpsServices, toast]);


  

  const handleCreateKeys = async (signerType: any) => {
    try {
      nostrService.generateKey(signerType);
      setKeysGenerated(true);
    } catch (error) {
      console.error('Error generating keys:', error);
      toast({
        title: "Error",
        description: "Failed to generate keys.",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Understanding Nostr Accounts</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="display-name" isRequired>
              <FormLabel>Display Name</FormLabel>
              <Input 
                placeholder="Enter your display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </FormControl>
            <br></br>
            <p>Each Nostr account is based on a public/private key pair. A simple way to think about this is that your public key is your username and your private key is your password, with one major caveat. Unlike a password, your private key cannot be reset if lost.</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              No, I will try this later
            </Button>
            <Button variant='ghost' onClick={() => handleCreateKeys('privateKey')}>
              Create my keys
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReturnFocus;
