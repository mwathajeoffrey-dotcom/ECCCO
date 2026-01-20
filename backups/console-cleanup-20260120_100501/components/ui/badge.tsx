import * as React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-blue-600 text-white',
      secondary: 'bg-gray-100 text-gray-900',
      outline: 'border border-gray-300 text-gray-900'
    }
    
    const baseClasses = 'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full'
    const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`

    return (
      <div
        className={combinedClasses}
        ref={ref}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge }