'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import React from 'react';

interface ModalProps {
  title: string;
  decription: string;
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  decription,
  isOpen,
  onClose,
  children,
  className,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className={cn('', className)}>
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl leading-customNormal">
            {title}
          </DialogTitle>
          <DialogDescription className="font-normal text-lg text-customMkt-blueLight">
            {decription}
          </DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
