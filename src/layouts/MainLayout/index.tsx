import React from 'react'
import SideBar from './Top'
import TopBar from './Side'

type Props = {
  children: React.ReactNode
}

const MainLayout = (props: Props) => {
  const { children } = props
  return (
    <>
      <TopBar />
      <SideBar />
      <div className='pl-[160px] pt-[44px] text-sm h-full w-full'>
        <div className='px-3 h-full w-full'>{children}</div>
      </div>
    </>
  )
}

export default MainLayout
