import React from 'react'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  id?: string
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  ...props
}) => {
  return (
    <section id={id} className={`py-16 sm:py-24 relative ${className}`} {...props}>
      {children}
    </section>
  )
}
