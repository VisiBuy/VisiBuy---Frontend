import Icon from "../../../../ui/Icon";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../ui/Table";
import { flexRender, Table as ITable } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { columns } from "./column-def";

import {
  Key,
  ComponentType,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export function SellerOrderTable<TData, TValue>({ table }: { table: any }) {
  return (
    <Table>
      <TableHeader className='bg-blue-200 font-OpenSans font-medium lg:text-xl text-center'>
        {table
          .getHeaderGroups()
          .map(
            (headerGroup: { id: Key | null | undefined; headers: any[] }) => (
              <TableRow className='text-center w-full' key={headerGroup.id}>
                {headerGroup.headers.map(
                  (header: {
                    id: Key | null | undefined;
                    isPlaceholder: any;
                    column: {
                      columnDef: {
                        header:
                          | string
                          | number
                          | boolean
                          | ComponentType<any>
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined;
                      };
                    };
                    getContext: () => any;
                  }) => {
                    return (
                      <TableHead className=' py-6 px-2 ' key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  }
                )}
              </TableRow>
            )
          )}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table
            .getRowModel()
            .rows.map(
              (row: {
                id: Key | null | undefined;
                getIsSelected: () => any;
                getVisibleCells: () => any[];
              }) => (
                <TableRow
                  className='text-lg font-medium font-OpenSans text-center p'
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(
                    (cell: {
                      id: Key | null | undefined;
                      column: {
                        columnDef: {
                          cell:
                            | string
                            | number
                            | boolean
                            | ComponentType<any>
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | null
                            | undefined;
                        };
                      };
                      getContext: () => any;
                    }) => (
                      <TableCell className='font-medium px-8' key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  )}
                </TableRow>
              )
            )
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='h-24 text-center'>
              <div className='flex flex-col min-h-screen justify-center items-center '>
                <img src='/product-inactive.png' alt='No active product' />
                <h2 className='text-4xl font-Montserrat font-medium'>
                  Your orders will show here.
                </h2>
                <p className='text-2xl font-OpenSans my-6'>
                  This is where you’ll fulfill orders, collect payment and track
                  order progress.
                </p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
