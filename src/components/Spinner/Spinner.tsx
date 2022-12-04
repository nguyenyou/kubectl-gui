import clsx from 'clsx'
import React from 'react'

export type ISpinProps = {
  size?: 'xs' | 'smd' | 'sm' | 'md' | 'lg' | 'xl'
}

export type SpinProps = {} & React.HTMLAttributes<SVGSVGElement> & ISpinProps

const sizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  smd: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}

// eslint-disable-next-line react/display-name
export const Spinner = React.forwardRef<SVGSVGElement, SpinProps>((props, ref) => {
  const { size = 'sm', className, ...rest } = props
  const classes = clsx('animate-spin', sizes[size])

  return (
    <svg
      ref={ref}
      className={clsx(classes, className)}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 66 66'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <circle className='opacity-30' cx='33' cy='33' fill='none' r='28' stroke='currentColor' strokeWidth='10' />
      <circle
        className='opacity-70'
        cx='33'
        cy='33'
        fill='none'
        r='28'
        stroke='currentColor'
        strokeDasharray='40, 134'
        strokeDashoffset='325'
        strokeLinecap='round'
        strokeWidth='10'
      />
    </svg>
  )
})
