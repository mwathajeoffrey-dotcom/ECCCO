import * as React from 'react';

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: number;
    max?: number;
  }
>(({ className = '', value = 0, max = 100, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative w-full overflow-hidden rounded-full bg-gray-200 h-2 ${className}`}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-blue-600 transition-all duration-300 ease-in-out"
      style={{
        transform: `translateX(-${100 - (value / max) * 100}%)`,
      }}
    />
  </div>
));
Progress.displayName = 'Progress';

export { Progress };