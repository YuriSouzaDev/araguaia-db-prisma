'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
// import { CellAction } from './cell-action';

export type OptionalColumn = {
  id: number;
  name: string;
};

export const optionalColumns: ColumnDef<OptionalColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
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
