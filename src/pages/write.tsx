import Head from "next/head";
import React from "react";
import Editor from "../components/Editor/Editor";

const Write: React.FC = () => {
  return (
    <>
      <Head>
        <title>Blog Editor</title>
      </Head>
      <Editor />
    </>
  );
};

export default Write;
