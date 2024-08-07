'use client';

import { logout } from '@/app/actions/logout';
import { useUser } from '@/stores/user-context';
import { Power } from 'lucide-react';

const Logout = () => {
  const { setUser } = useUser();

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div className="flex gap-6 group w-full pr-6 py-2" onClick={handleLogout}>
      <div className="rounded-r-[10px] bg-transparent group-hover:bg-custom-primary w-[6px] transition" />
      <div className="flex items-center justify-start gap-2 pb-[13px] pt-[17px] pl-6 w-full text-sm font-semibold leading-[0.3px] rounded-[6px] group-hover:bg-custom-primary group-hover:text-white text-custom-textBlack transition cursor-pointer ">
        <Power
          width={24}
          height={24}
          className="text-custom-textBlack group-hover:text-white transition -mt-1"
        />
        Sair
      </div>
    </div>
  );
};

export default Logout;
