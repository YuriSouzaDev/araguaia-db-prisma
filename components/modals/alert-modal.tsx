'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Modal } from './modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMouted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMouted) return null;

  return (
    <Modal
      title="Você tem certeza?"
      decription="Esta ação não pode ser desfeita."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-6 flex items-center justify-end w-full">
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
