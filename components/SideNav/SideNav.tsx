'use client';

import { Car, ClipboardList, House, Tag, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logout from './components/Logout';
import MenuItem from './components/MenuItem';

const SideNav = () => {
  const pathname = usePathname();
  const Items = [
    {
      title: 'Visão Geral',
      href: '/dashboard',
      icon: <House height={24} width={24} className="-mt-1" />,
      active: pathname === '/dashboard',
    },
    {
      title: 'Veículos',
      href: '/dashboard/veiculos',
      icon: <Car height={24} width={24} className="-mt-1" />,
      active: pathname.includes('/dashboard/veiculos'),
    },
    {
      title: 'Marcas',
      href: '/dashboard/marcas',
      icon: <Tag height={24} width={24} className="-mt-1" />,
      active: pathname.includes('/dashboard/marcas'),
    },
    {
      title: 'Opcionais',
      href: '/dashboard/opcionais',
      icon: <ClipboardList height={24} width={24} className="-mt-1" />,
      active: pathname.includes('/dashboard/opcionais'),
    },
    {
      title: 'Usuários',
      href: '/dashboard/usuarios',
      icon: <User height={24} width={24} className="-mt-1" />,
      active: pathname.includes('/dashboard/usuarios'),
    },
  ];
  return (
    <aside className="fixed top-0 bottom-0 left-0 z-20 bg-custom-bgSideNav w-full max-w-[240px] shadow-3xl">
      <div className="h-[70px] flex justify-center items-center">
        <h1>Logo</h1>
      </div>
      <nav className="flex flex-col justify-between h-[calc(100%-70px)] py-4">
        <ul className="pr-6 flex flex-col gap-3 w-full h-full">
          {Items.map((item) => (
            <MenuItem
              key={item.title}
              title={item.title}
              href={item.href}
              icon={item.icon}
              active={item.active}
            />
          ))}
        </ul>
        <Logout />
      </nav>
    </aside>
  );
};

export default SideNav;
