import Editor from '@monaco-editor/react'
import React from 'react'
import CodeHighlight from './CodeHighlight'

type Props = {
  mode: 'vscode' | 'prism' | 'pre'
  codetext: string
}

const StdoutView = ({ mode, codetext = 'Loading...' }: Props) => {
  if (mode === 'pre') {
    return <pre className='px-4'>{codetext}</pre>
  }

  if (mode == 'prism') {
    return (
      <div className='px-2'>
        <CodeHighlight codetext={codetext} />
      </div>
    )
  }

  return (
    <Editor
      height='100%'
      language='yaml'
      theme='vs-dark'
      options={{
        readOnly: true,
      }}
      value={codetext}
    />
  )
}

export default StdoutView
