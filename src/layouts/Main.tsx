import React from 'react'

type Props = {
  children: React.ReactNode
}

const MainLayout = (props: Props) => {
  const { children } = props
  return (
    <>
      {children}
    </>
  )
}

export default MainLayout
