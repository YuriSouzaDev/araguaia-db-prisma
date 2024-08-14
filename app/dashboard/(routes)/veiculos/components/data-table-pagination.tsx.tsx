import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

const DataTablePagination = <TData,>({
  table,
}: DataTablePaginationProps<TData>) => {
  const [totalItemsDisplayed, setTotalItemsDisplayed] = useState(
    table.getRowModel().rows.length,
  );

  useEffect(() => {
    const { pageIndex, pageSize } = table.getState().pagination;
    const totalDisplayed = (pageIndex + 1) * pageSize;
    setTotalItemsDisplayed(totalDisplayed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    table.getState().pagination.pageIndex,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    table.getState().pagination.pageSize,
  ]);

  return (
    <div className="flex items-center justify-between px-2 border-t">
      <div className="flex-1 text-sm text-muted-foreground">
        Mostrando{' '}
        {Math.min(totalItemsDisplayed, table.getFilteredRowModel().rows.length)}{' '}
        {''}
        de {table.getFilteredRowModel().rows.length} resultados.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8 p-5">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {table.getPageCount() === 0
            ? `Página ${
                table.getState().pagination.pageIndex
              } de ${table.getPageCount()}`
            : `Página ${
                table.getState().pagination.pageIndex + 1
              } de ${table.getPageCount()}`}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              `hidden h-8 w-8 p-0 opacity-50 lg:flex items-center justify-center rounded-lg border-custom-gray border`,
              table.getCanPreviousPage() &&
                'hover:border-custom-primary hover:bg-custom-white opacity-100 hover:text-custom-primary',
            )}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir para a primeira página</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              `hidden h-8 w-8 p-0 opacity-20 lg:flex items-center justify-center rounded-lg border-custom-gray border`,
              table.getCanPreviousPage() &&
                'hover:border-custom-primary hover:bg-custom-white opacity-100 hover:text-custom-primary',
            )}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir para a página anterior</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              `hidden h-8 w-8 p-0 opacity-20 lg:flex items-center justify-center rounded-lg border-custom-gray border`,
              table.getCanNextPage() &&
                'hover:border-custom-primary hover:bg-custom-white opacity-100 hover:text-custom-primary',
            )}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir para a próxima página</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              `hidden h-8 w-8 p-0 opacity-20 lg:flex items-center justify-center rounded-lg border-custom-gray border`,
              table.getCanNextPage() &&
                'hover:border-custom-primary hover:bg-custom-white opacity-100 hover:text-custom-primary',
            )}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir para a última página</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTablePagination;
