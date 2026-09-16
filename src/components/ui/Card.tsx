import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'interactive'
  className?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-[#111113] border border-white/8 rounded-2xl shadow-xl shadow-black/40',
    glass: 'bg-[#111113]/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl',
    interactive: 'bg-[#111113] border border-white/8 rounded-2xl shadow-xl shadow-black/40 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60',
  }[variant]

  return (
    <div className={`${variantStyles} ${className}`} {...props}>
      {children}
    </div>
  )
}
