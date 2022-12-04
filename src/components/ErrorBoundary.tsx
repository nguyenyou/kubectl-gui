import React from 'react'

type Props = {
  children: React.ReactNode
  info?: string
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: any) {
    console.log(error)
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className='flex h-full w-full items-center justify-center bg-white text-sm'>
          <div className='container'>
            <div className='mx-auto flex w-[400px] flex-col items-center gap-4 py-4'>
              <h2 className='text-center font-bold'>{this.props.info ?? 'Something went wrong.'}</h2>
              <button
                className='flex h-10 w-[180px] items-center justify-center rounded bg-primary-500 text-white hover:bg-primary-400 active:bg-primary-600'
                type='button'
                onClick={() => this.setState({ hasError: false })}
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary
