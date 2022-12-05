import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import codeTheme from 'prism-react-renderer/themes/vsDark'

type Props = {
  codetext: string
}

const CodeHighlight = ({ codetext }: Props) => {
  return (
    <div className='px-3'>
      <Highlight {...{ ...defaultProps, theme: codeTheme }} code={codetext} language='json'>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default CodeHighlight
