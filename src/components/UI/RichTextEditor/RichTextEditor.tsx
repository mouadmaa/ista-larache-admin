import React, { FC, useState } from 'react'
import BraftEditor from 'braft-editor'

import 'braft-editor/dist/index.css'

interface RichTextEditorProps {
  html: string
  setHtml: (text: string) => void
}

const RichTextEditor: FC<RichTextEditorProps> = props => {
  const { setHtml } = props

  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(''))

  const handleChange = (editorState: any) => {
    setEditorState(editorState)
    setHtml(editorState.toHTML())
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
