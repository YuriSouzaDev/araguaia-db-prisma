'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
// import { CellAction } from './cell-action';

export type VehicleColumn = {
  id: number;
  name: string;
  lastModifiedByName: string;
  updatedAt: string;
  createdAt: string;
  brandName: string;
};

export const vehicleColumns: ColumnDef<VehicleColumn>[] = [
  {
    accessorKey: 'name',
    header: () => 'Nome',
  },
  {
    accessorKey: 'brandName',
    header: 'Marca',
  },
  {
    accessorKey: 'lastModifiedByName',
    header: 'Última modificação por',
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
