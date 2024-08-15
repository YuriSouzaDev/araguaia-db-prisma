'use client';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/lib/supabase';
import axios from 'axios';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { VehicleColumn } from './columns';

interface CellActionProps {
  data: VehicleColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/v1/vehicles/${data.id}`);
      router.refresh();
      toast.success('Veículo deletado');
    } catch (error) {
      // toast.error(
      //   'Tenha certeza que você deletou todos os produtos que usam essa cor primeiro.'
      // );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleRemove = async (key: string | undefined) => {
    if (key) {
      const { error } = await supabase.storage
        .from('brand-images')
        .remove([key]);
      if (error) {
        alert('Erro ao remover a imagem: ' + error.message);
      }
    }
  };

  return (
    <>
      {open && (
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onDelete}
          loading={loading}
        />
      )}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setOpenEdit(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" />
              Apagar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
