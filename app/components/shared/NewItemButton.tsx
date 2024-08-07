'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

interface NewItemButton {
  label: string;
  push: string;
}

const NewItemButton: React.FC<NewItemButton> = ({ label, push }) => {
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={() => router.push(push)}
        className="flex justify-center items-center pb-[13px] pt-[17px] px-[82px] gap-2 text-sm font-bold bg-custom-primary hover:bg-custom-primary/80"
      >
        <Plus height={24} width={24} className="-mt-1" />
        {label}
      </Button>
    </div>
  );
};

export default NewItemButton;
