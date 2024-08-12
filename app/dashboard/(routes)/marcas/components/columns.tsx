'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
// import { CellAction } from './cell-action';

export type BrandColumn = {
  id: number;
  name: string;
  imageUrl: string;
  isArchived: boolean;
  updatedAt: string;
  createdAt: string;
};

export const vehicleColumns: ColumnDef<BrandColumn>[] = [
  {
    accessorKey: 'name',
    header: () => 'Nome',
    cell: ({ row }) => {
      return (
        <div className="relative ml-7">
          <div
            className="w-5 h-5 absolute -left-7 top-0"
            style={{
              backgroundImage: `url(${row.original.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          />
          {row.original.name}
        </div>
      );
    },
  },
  {
    accessorKey: 'isArchived',
    header: 'Arquivada',
    cell: ({ row }) => (row.original.isArchived ? 'Sim' : 'Não'),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Última atualização',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
