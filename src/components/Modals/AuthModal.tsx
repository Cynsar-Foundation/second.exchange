import React, { useEffect, useState } from "react";
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
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { authModalState } from "../../atoms/authModalStateAtom";
import { authAtom } from "../../atoms/authStateAtom";
import initConnection  from "../../service/nostrSetup";
import { useRouter } from "next/router";
import { relayPoolAtom } from "../../atoms/relayPoolAtom";

const AuthModal: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const pool = useAtomValue(relayPoolAtom);
  const [modalOpen, setModalOpen] = useAtom(authModalState);
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [userAuthenticated, setUserAuthenticated] = useAtom(authAtom);

  const handleClose = () => {
    setModalOpen(false);
  };

  const generateKey = async () => {
    const { generatePrivateKey } = await import("nostr-tools");
    setPrivateKey(generatePrivateKey());
  };

  useEffect(() => {
    const generatePublicKey = async () => {
      const { getPublicKey } = await import("nostr-tools");
      if (isKey(privateKey) !== null) setPublicKey(getPublicKey(privateKey));
    };
    generatePublicKey();
  }, [privateKey]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPrivateKey(event.target.value);

  const isKey = (key: string) => {
    return key?.toLowerCase()?.match(/^[0-9a-f]{64}$/);
  };

  const handleProceed = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "keys",
          JSON.stringify({
            publicKey: publicKey,
            privateKey: privateKey,
          })
        );
      } catch (error) {
        console.log("handleProceed error", error);
      } finally {
        setUserAuthenticated(true);
        setPrivateKey("");
        initConnection(pool);
        toast({
          title: "Logged in!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          const pubKey =
            localStorage.getItem("keys") !== null
              ? JSON.parse(localStorage.getItem("keys")!).publicKey
              : null;
          console.log(pubKey);
          let initAuthor;
          if (pubKey)
            initAuthor = [
              "dfb0b888e9b322e90c3ee3b06fe5d3e79bc2f3bdf1ffe31002919512d90129a4",
              pubKey,
            ];
          else
            initAuthor = [
              "dfb0b888e9b322e90c3ee3b06fe5d3e79bc2f3bdf1ffe31002919512d90129a4",
            ];
          setUserAuthenticated(localStorage.getItem("keys") !== null);
          localStorage.setItem("follow-list", JSON.stringify(initAuthor));
        }, 1000);
        handleClose();
        setTimeout(() => router.reload(), 2000);
      }
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("keys");
        localStorage.removeItem("follow-list");
      } catch (error) {
        console.log("handleLogout error", error);
      } finally {
        setUserAuthenticated(false);
        handleClose();
        router.reload();
        router.push("/");
      }
    }
  };

  return (
    <Modal isOpen={modalOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Initial Key Setup</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!userAuthenticated ? (
            <Flex flexDirection="column">
              <Text>
                Type your private key from a previous Nostr account or generate
                a new one.
              </Text>
              <Text mt="10px">
                You can also type just a public key and later sign events
                manually or using a Nostr-capable browser extension.
              </Text>
              <Input
                mt="15px"
                placeholder="Private key or Public key"
                value={privateKey}
                onChange={handleChange}
              />
            </Flex>
          ) : (
            <Flex flexDirection="column">
              <Text>Are you sure you want to logout?</Text>
              <Text mt="10px">
                Logging out will delete all your data from this device
              </Text>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          {!userAuthenticated ? (
            <Flex columnGap="10px">
              <Button variant="solid" onClick={() => generateKey()}>
                Generate
              </Button>
              <Button
                disabled={isKey(privateKey) === null}
                onClick={handleProceed}
              >
                Proceed
              </Button>
            </Flex>
          ) : (
            <Flex columnGap="10px">
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleLogout}>Yes, log me out</Button>
            </Flex>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
