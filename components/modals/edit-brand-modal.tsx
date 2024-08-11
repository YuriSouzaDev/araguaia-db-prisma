'use client';

import BrandFormClient from '@/app/dashboard/(routes)/marcas/components/BrandFormClient';
import { BrandColumn } from '@/app/dashboard/(routes)/marcas/components/columns';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Modal } from './modal';

interface EditBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  data: BrandColumn;
}

export const EditBrandModal: React.FC<EditBrandModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  data,
}) => {
  const [isMouted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMouted) return null;
  console.log(data);

  return (
    <Modal
      title="Você tem certeza?"
      decription="Esta ação não pode ser desfeita."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-6 flex items-center justify-end w-full">
        <BrandFormClient />
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Confirmar
        </Button>
      </div>
    </Modal>
  );
};
