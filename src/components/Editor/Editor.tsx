import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";

import { MenuBar } from "./Menubar";
import { publishPost } from "../../service/nostrOps";
import { useAtomValue } from "jotai";
import { relayPoolAtom } from "../../atoms/relayPoolAtom";
import { useRouter } from "next/router";

const Editor = () => {
  const pool = useAtomValue(relayPoolAtom);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (titleError)
      toast({
        title: "Give your post a title",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    setTitleError(false);
  }, [titleError]);

  const handlePost = async () => {
    setLoading(true);
    if (title === "") {
      setTitleError(true);
      setLoading(false);
      return;
    }
    try {
      const post: Post = {
        title: title,
        contentType: "html",
        content: editor ? editor.getHTML() : "",
      };
      await publishPost(post, pool);
      toast({
        title: "Posted Successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setTimeout(() => router.push("/myposts"), 2000);
    } catch (error) {
      toast({
        title: "Failed to post",
        description: "Check logs for the reason of failure",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log("handlePost error: ", error);
    } finally {
    }
    setLoading(false);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        showOnlyCurrent: false,
        placeholder: "Your content goes here!",
      }),
    ],
  });

  return (
    <>
      <Box
        m={3}
        maxWidth={900}
        marginLeft={"auto"}
        marginRight={"auto"}
        p={3}
        overflow="hidden"
      >
        <MenuBar editor={editor} />
        <input
          style={{
            outline: "none",
            fontWeight: "bold",
            fontSize: "30px",
            marginTop: "10px",
            backgroundColor: useColorModeValue("white", "#1A202C"),
          }}
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Box border="1px solid #CBCBCB" p="15px" mt="10px" cursor="text">
          <EditorContent autoFocus editor={editor} />
        </Box>
        <Flex mt="15px" justifyContent="center" columnGap="15px">
          <Button
            fontSize="xl"
            variant="ghost"
            border="2px solid"
            borderColor="brand.100"
            onClick={onOpen}
          >
            Preview
          </Button>
          <Button fontSize="xl" onClick={handlePost} isLoading={loading}>
            Post
          </Button>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="preview">
            <Heading>{title}</Heading>
            {editor !== null ? (
              <div
                dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
                className="renderer"
              />
            ) : (
              "Start Writing!"
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Editor;
