import { useCallback, useState, useEffect } from "react"
import { logger } from "../../utils/logger"
import initialData from "./data.json"

export const dataKey = "editorData"

export const useSaveCallback = (editor: any) => {
  return useCallback(async () => {
    if (!editor) return
    try {
      const out = await editor.save()
      console.group("EDITOR onSave")
      console.dir(out)
      localStorage.setItem(dataKey, JSON.stringify(out))
      console.info("Saved in localStorage")
      console.groupEnd()
    } catch (e) {
      console.error("SAVE RESULT failed", e)
    }
  }, [editor])
}

// Set editor data after initializing
export const useSetData = (editor: any, data: any) => {
  useEffect(() => {
    if (!editor || !data) {
      return
    }

        editor.isReady.then(() => {
            // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
            logger.info('Editor is ready for the work', editor)
            if (typeof editor === 'function') {
                setTimeout(() => {
                    editor.render(data)
                     }, 100)
            }
            
          })
  }, [editor, data])
}

export const useClearDataCallback = (editor: any) => {
  return useCallback(
    (ev: any) => {
      ev.preventDefault()
      if (!editor) {
        return
      }
      editor.isReady.then(() => {
        // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
        setTimeout(() => {
          editor.clear()
        }, 100)
      })
    },
    [editor]
  )
}

// load saved data
export const useLoadData = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  // Mimic async data load
  useEffect(() => {
    setLoading(true)
    const id = setTimeout(() => {
      console.group("EDITOR load data")
      const saved = localStorage.getItem(dataKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        setData(parsed)
        console.dir(parsed)
      } else {
        console.info("No saved data, using initial")
        console.dir(initialData)
        setData(initialData)
      }
      console.groupEnd()
      setLoading(false)
    }, 200)

    return () => {
      setLoading(false)
      clearTimeout(id)
    }
  }, [])

  return { data, loading }
}