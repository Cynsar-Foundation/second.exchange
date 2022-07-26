import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import createDOMPurify from "dompurify";

import { MenuBar } from "./Menubar";
import { Post } from "../../types";
import { publishPost } from "../../service/nostrOps";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  // const [content, setContent] = useState<any>();
  const [titleError, setTitleError] = useState(false);
  const toast = useToast();
  const DOMPurify =
    typeof window !== "undefined" ? createDOMPurify(window) : undefined;

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
      await publishPost(post);
      toast({
        title: "Posted Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
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
        // placeholder: ({ node }) => {
        //   if (node.type.name === "heading") {
        //     return "What’s the title?";
        //   }
        //   if (node.type.name === "paragraph") {
        //     return "Your content here";
        //   }
        //   return "Can you add some further context?";
        // },
        placeholder: "Your content goes here!",
      }),
    ],
    // content: `
    //   <h1>
    //   </h1>
    //   <p>
    //   </p>
    // `,
  });

  return (
    <>
      <Box m={3} maxWidth={900} marginLeft={"auto"} marginRight={"auto"} p={3}>
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
          <EditorContent editor={editor} />
        </Box>
        <Flex mt="15px" justifyContent="center">
          <Button fontSize="xl" onClick={handlePost} isLoading={loading}>
            Post
          </Button>
        </Flex>
        {/* {DOMPurify && content && (
        <div
          style={{ fontSize: "20px" }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
      )} */}
      </Box>
    </>
  );
};

export default Editor;
