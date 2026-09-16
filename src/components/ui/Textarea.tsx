import React from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-medium text-neutral-300">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full bg-neutral-900 border ${
            error ? 'border-red-500' : 'border-white/10 focus:border-white/40'
          } rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none transition-all resize-y min-h-[100px] ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
