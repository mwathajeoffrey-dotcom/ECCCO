import * as React from 'react';

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextValue>({});

const Select = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    onValueChange?: (value: string) => void;
  }
>(({ children, value, onValueChange, ...props }, ref) => (
  <SelectContext.Provider value={{ value, onValueChange }}>
    <div ref={ref} className="relative" {...props}>
      {children}
    </div>
  </SelectContext.Provider>
));
Select.displayName = 'Select';

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = '', children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <button
      ref={ref}
      className={`
        flex h-10 w-full items-center justify-between rounded-md border border-gray-300 
        bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none 
        focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed 
        disabled:opacity-50 ${className}
      `}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {children}
    </button>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    placeholder?: string;
  }
>(({ className = '', placeholder, ...props }, ref) => {
  const { value } = React.useContext(SelectContext);
  
  return (
    <span
      ref={ref}
      className={`block truncate ${value ? 'text-gray-900' : 'text-gray-400'} ${className}`}
      {...props}
    >
      {value || placeholder}
    </span>
  );
});
SelectValue.displayName = 'SelectValue';

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`
      absolute top-full left-0 z-50 w-full mt-1 bg-white border border-gray-300 
      rounded-md shadow-lg max-h-60 overflow-auto ${className}
    `}
    {...props}
  >
    {children}
  </div>
));
SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
  }
>(({ className = '', children, value, ...props }, ref) => {
  const { onValueChange } = React.useContext(SelectContext);
  
  return (
    <div
      ref={ref}
      className={`
        cursor-pointer select-none relative py-2 px-3 text-sm 
        hover:bg-gray-100 focus:bg-gray-100 ${className}
      `}
      onClick={() => onValueChange?.(value)}
      {...props}
    >
      {children}
    </div>
  );
});
SelectItem.displayName = 'SelectItem';

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };