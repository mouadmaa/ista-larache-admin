import React, { FC, useEffect, useState } from 'react'
import BraftEditor from 'braft-editor'

import 'braft-editor/dist/index.css'

interface RichTextEditorProps {
  htmlContent: string
  setHtmlContent: (text: string) => void
}

const RichTextEditor: FC<RichTextEditorProps> = props => {
  const { htmlContent, setHtmlContent } = props

  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(''))

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(htmlContent))
  }, [htmlContent])

  const handleChange = (editorState: any) => {
    setEditorState(editorState)
    setHtmlContent(editorState.toHTML())
  }

  return (
    <div className="editor-wrapper">
      <BraftEditor
        value={editorState}
        onChange={handleChange}
        language='en'
      />
    </div>
  )
}

export default RichTextEditor
