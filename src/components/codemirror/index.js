import React from 'react'

import { UnControlled as CodeMirror } from 'react-codemirror2'

const CodeMirrorComponent = () => (
  <CodeMirror
    value='<h1>Testing codemirror</h1>'
    options={{
      mode: 'xml',
      theme: 'material',
      lineNumbers: true
    }}
    onChange={(editor, data, value) => {}}
  />
)

export default CodeMirrorComponent
