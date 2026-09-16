import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'info' | 'demo' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  }[size]

  const variantStyles = {
    default: 'bg-neutral-800 text-neutral-300 border border-neutral-700/60',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    demo: 'bg-purple-500/15 text-purple-300 border border-purple-500/30 uppercase tracking-wider font-semibold',
    outline: 'bg-transparent text-neutral-400 border border-neutral-700',
  }[variant]

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeStyles} ${variantStyles} ${className}`}
    >
      {children}
    </span>
  )
}
