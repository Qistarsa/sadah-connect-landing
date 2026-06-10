import * as React from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'purple' | 'outline' | 'ghost' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
};

type AsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };
type AsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };

export type ButtonProps = AsButton | AsLink;

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-8 py-3.5 text-base',
};

const variants: Record<Variant, string> = {
  primary:
    'button-after bg-navy text-white shadow-[0_12px_30px_-12px_rgba(33,11,101,0.7)] hover:bg-[#2c1480]',
  purple: 'bg-primary-600 text-white shadow-md hover:bg-primary-700 hover:shadow-lg',
  outline: 'border border-primary-300 text-primary-700 hover:bg-primary-50',
  ghost: 'text-primary-700 hover:bg-primary-50',
  whatsapp: 'bg-whatsapp text-white shadow-md hover:brightness-95',
};

const base =
  'relative inline-flex select-none items-center justify-center gap-2 rounded-xl font-semibold ' +
  'transition-[transform,background-color,box-shadow] duration-200 hover:scale-[1.02] active:scale-[0.98] ' +
  'disabled:pointer-events-none disabled:opacity-50';

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, leftIcon, rightIcon, children, ...rest } = props;
  const cls = cn(base, sizes[size], variants[variant], className);
  const inner = (
    <>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      {children}
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
    </>
  );

  if (typeof props.href === 'string') {
    const { href: _h, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      href?: string;
    };
    return (
      <a href={props.href} className={cls} {...anchorRest}>
        {inner}
      </a>
    );
  }

  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
