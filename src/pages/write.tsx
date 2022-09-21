import React, { useState } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import {
  useSaveCallback,
  useLoadData,
  options,
  useSetData,
  useClearDataCallback,
} from "../components/Editor"

const Editor = dynamic<{
  editorRef: any
  children?: any
  data: any
  options: any
}>(
  () =>
    import("../components/Editor/CustomEditor").then((mod) => mod.EditorContainer),
  { ssr: false }
)

export default function EditorPage() {
  const [editor, setEditor] = useState(null)

  // save handler
  const onSave = useSaveCallback(editor)

  // load data
  const { data, loading } = useLoadData()

  // set saved data
  useSetData(editor, data)

  // clear data callback
  const clearData = useClearDataCallback(editor)

  const disabled = editor === null || loading

  return (
    <Editor editorRef={setEditor} options={options} data={data} />
  )
}