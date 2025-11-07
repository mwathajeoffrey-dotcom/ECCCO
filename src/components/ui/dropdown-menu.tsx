import * as React from "react"

// Dropdown Menu Component (simplified version)
const DropdownMenu = ({ children, open, onOpenChange }: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  return <div className="relative">{children}</div>
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ children, asChild, ...props }, ref) => {
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  )
})

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { align?: 'start' | 'center' | 'end' }
>(({ className = '', align = 'start', ...props }, ref) => {
  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-0'
  }
  
  return (
    <div
      ref={ref}
      className={`absolute top-full mt-1 ${alignClasses[align]} z-50 min-w-[200px] bg-white border border-gray-200 rounded-md shadow-lg py-1 ${className}`}
      {...props}
    />
  )
})

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`px-3 py-2 text-sm font-semibold text-gray-900 ${className}`}
      {...props}
    />
  )
})

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`border-t border-gray-200 my-1 ${className}`}
      {...props}
    />
  )
})

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
  }
>(({ className = '', checked, onCheckedChange, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${className}`}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <div className="mr-2 h-4 w-4 flex items-center justify-center">
        {checked && <span className="text-blue-600">✓</span>}
      </div>
      {children}
    </div>
  )
})

DropdownMenuTrigger.displayName = "DropdownMenuTrigger"
DropdownMenuContent.displayName = "DropdownMenuContent"
DropdownMenuLabel.displayName = "DropdownMenuLabel"
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
}