import React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'lg',
  ...props
}) => {
  const maxW = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full',
  }[size]

  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxW} ${className}`} {...props}>
      {children}
    </div>
  )
}
