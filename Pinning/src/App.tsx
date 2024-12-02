import {
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import data from "../data.json";
import React, { useState } from "react";
import { defaultColumns } from "./table";

function App() {
  const [columns] = React.useState(() => [...defaultColumns]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  });
  const table = useReactTable({
    data,
    columns,
    state: { columnPinning },
    getCoreRowModel: getCoreRowModel(),
    onColumnPinningChange: setColumnPinning,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  <div>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                  {!header.isPlaceholder && header.column.getCanPin() && (
                    <div className="flex gap-1 justify-center">
                      {header.column.getIsPinned() !== "left" ? (
                        <button
                          className="border rounded px-2"
                          onClick={() => {
                            header.column.pin("left");
                          }}
                        >
                          {"<="}
                        </button>
                      ) : null}
                      {header.column.getIsPinned() ? (
                        <button
                          className="border rounded px-2"
                          onClick={() => {
                            header.column.pin(false);
                          }}
                        >
                          X
                        </button>
                      ) : null}
                      {header.column.getIsPinned() !== "right" ? (
                        <button
                          className="border rounded px-2"
                          onClick={() => {
                            header.column.pin("right");
                          }}
                        >
                          {"=>"}
                        </button>
                      ) : null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}

export default App;
