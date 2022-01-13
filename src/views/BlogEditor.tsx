import React from "react";

import { EDITOR_JS_TOOLS } from "../constants/editor-constants";
import { createReactEditorJS } from "react-editor-js";

const TEXT_EDITOR_CONTENT = "saved-text-local";

const ReactEditorJS = createReactEditorJS();

const publishBlog = () => {
    
}

export const BlogEditor = () => {
    const editorCore = React.useRef(null);
    // @ts-ignore

    const handleInitialize = React.useCallback((instance) => {
        editorCore.current = instance
      }, [])

      const handleSave = React.useCallback(async () => {
        //@ts-ignore
        const savedData = await editorCore.current.save();
        //@ts-ignore
        // localStorage.setItem(TEXT_EDITOR_CONTENT, JSON.stringify(savedData));
      }, [])

    return (
        <div className="blog-editor-container">
            {/* @ts-ignore */}
            <ReactEditorJS onInitialize={handleInitialize} instanceRef={(instance) => (instanceRef.current = instance)}
                tools={EDITOR_JS_TOOLS}
                i18n={{
                    messages: {},
                }}
                data={{
                    time: 1556098174501,
                    blocks: [
                        {
                            type: "header",
                            data: {
                            text: "Editor.js",
                            level: 2
                        }
                      }
                    ]
                }}
            />

            <button 
                className="blog-ops-button"
                onClick={handleSave}
            >
                Save!
            </button>
        </div>
    );
};
