import { Box, Input, useColorModeValue } from "@chakra-ui/react";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";

import { MenuBar } from "./Menubar";

const CustomDocument = Document.extend({
  content: "heading block*",
});

const Editor = () => {
  const [title, setTitle] = useState("");
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit,
      Heading,
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
        placeholder: "Start writing your blog here!",
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
    </Box>
  );
};

export default Editor;
