import React from "react";
// @ts-ignore
import Output from "editorjs-react-renderer";

const TEXT_EDITOR_CONTENT = "saved-text-local";
// @ts-ignore
const data = JSON.parse(localStorage.getItem(TEXT_EDITOR_CONTENT));

export const BlogView = () => {
    console.log(data);
    return (
        <div className="blog-container">
            <Output data={data} />
        </div>
    );
};
