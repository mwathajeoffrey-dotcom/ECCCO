import * as React from 'react';
import { createPortal } from 'react-dom';

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

const SelectContext = React.createContext<SelectContextValue>({});

const Select = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    onValueChange?: (value: string) => void;
  }
>(({ children, value, onValueChange, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  
  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        const dropdowns = document.querySelectorAll('[data-select-content]');
        let clickedInside = false;
        dropdowns.forEach(dropdown => {
          if (dropdown.contains(event.target as Node)) {
            clickedInside = true;
          }
        });
        if (!clickedInside) {
          setIsOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen, triggerRef }}>
      <div ref={ref} className="relative" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
});
Select.displayName = 'Select';

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = '', children, ...props }, ref) => {
  const { isOpen, setIsOpen, triggerRef } = React.useContext(SelectContext);
  
  // Combine refs
  React.useImperativeHandle(ref, () => triggerRef?.current as HTMLButtonElement);
  
  return (
    <button
      ref={triggerRef}
      type="button"
      className={`
        flex h-10 w-full items-center justify-between rounded-md border border-gray-300 
        bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none 
        focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed 
        disabled:opacity-50 ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : ''} ${className}
      `}
      onClick={() => setIsOpen?.(!isOpen)}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      <svg
        className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
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
>(({ className = '', children, ...props }, ref) => {
  const { isOpen, triggerRef } = React.useContext(SelectContext);
  const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0 });
  
  React.useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen, triggerRef]);
  
  if (!isOpen) return null;
  
  return createPortal(
    <div
      ref={ref}
      data-select-content
      className={`
        fixed bg-white border border-gray-300 rounded-md shadow-lg 
        max-h-60 overflow-auto z-[9999] ${className}
      `}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
      }}
      {...props}
    >
      {children}
    </div>,
    document.body
  );
});
SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
  }
>(({ className = '', children, value, ...props }, ref) => {
  const { onValueChange, setIsOpen } = React.useContext(SelectContext);
  
  return (
    <div
      ref={ref}
      className={`
        cursor-pointer select-none relative py-2 px-3 text-sm 
        hover:bg-gray-100 focus:bg-gray-100 transition-colors ${className}
      `}
      onClick={() => {
        onValueChange?.(value);
        setIsOpen?.(false);
      }}
      role="option"
      {...props}
    >
      {children}
    </div>
  );
});
SelectItem.displayName = 'SelectItem';

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };