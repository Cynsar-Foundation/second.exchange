import React, { useEffect, useRef } from "react";
import "@blocksuite/presets/themes/affine.css";
import { createEmptyPage, DocEditor } from "@blocksuite/presets";
import { Text } from "@blocksuite/store";

// Define your prop types here
interface CustomEditorProps {
  data: any; // Specify the structure of your initial data
  onChange: (data: any) => void; // Specify the type of your data for onChange
}

const CustomEditor = ({ data, onChange }: CustomEditorProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let docEditor: DocEditor | null = null;

    (async () => {
      const page = await createEmptyPage().init();
      docEditor = new DocEditor();
      docEditor.page = page;

      if (editorRef.current) {
        editorRef.current.appendChild(docEditor);

        // Assuming `data` contains initial content for the editor
        // and that there's a method to set this content in `@blocksuite/presets`
        // Update this part according to the actual API of `@blocksuite/presets`
        // Update block node with some initial text content
        console.log(page.getBlockByFlavour("affine:paragraph"));
        const paragraphs = page.getBlockByFlavour("affine:paragraph");
        if (paragraphs.length > 0) {
          const paragraph = paragraphs[0];
          page.updateBlock(paragraph, {
            text: new Text("Empty canvas to begin with!"),
            type: "h1",
          });
        }
      }
    })();

    return () => {
      // Cleanup editor on component unmount
      docEditor?.remove();
    };
  }, [data]); // Reacting to changes in `data`

  return (
    <div
      style={{
        height: "100vh",
        margin: "0",
        padding: "0",
        overflow: "auto", // In case the content exceeds the viewport
      }}
      ref={editorRef}
    />
  );
};

export default CustomEditor;
