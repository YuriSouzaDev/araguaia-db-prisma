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
};

export const vehicleColumns: ColumnDef<VehicleColumn>[] = [
  {
    accessorKey: 'name',
    header: () => 'Nome',
    cell: ({ row }) => {
      return (
        <div className="relative ml-7">
          <div
            className="w-5 h-5 absolute -left-7 top-0"
            style={{
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
