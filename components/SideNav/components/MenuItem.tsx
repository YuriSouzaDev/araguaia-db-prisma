import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface MenuItemProps {
  title: string;
  href: string;
  icon: JSX.Element;
  active: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, href, icon, active }) => {
  return (
    <li className="flex gap-6 group w-full">
      <div
        className={cn(
          'rounded-r-[10px] bg-transparent group-hover:bg-custom-primary w-[6px] transition',
          active && 'bg-custom-primary',
        )}
      />
      <Link
        href={href}
        className={cn(
          'flex items-center justify-start gap-2 pb-[13px] pt-[17px] pl-6 w-full text-sm font-semibold leading-[0.3px] rounded-[6px] group-hover:bg-custom-primary group-hover:text-white text-custom-textBlack transition',
          active && 'bg-custom-primary text-white',
        )}
      >
        {icon}
        {title}
      </Link>
    </li>
  );
};

export default MenuItem;
