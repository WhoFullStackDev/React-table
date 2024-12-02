import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import data from "../data.json";
import RowAction from "./RowAction";
import React from "react";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const columnHelper = createColumnHelper<Person>();

const defaultColumns = [
  columnHelper.display({
    id: "action",
    cell: (props) => <RowAction row={props.row} />,
  }),
  columnHelper.group({
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      }),
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  }),
  columnHelper.group({
    header: "info",

    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("age", {
        header: "Age",
        footer: (props) => props.column.id,
      }),
      columnHelper.group({
        header: "More info",
        columns: [
          columnHelper.accessor("visits", {
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("status", {
            header: () => "Status",
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("progress", {
            header: "Profile Progress",
            footer: (props) => props.column.id,
          }),
        ],
      }),
    ],
  }),
];

const App = () => {
  const [columnFilters, setColumnFilters] = React.useState([]);

  const [sorting, setSorting] = React.useState<SortingState[]>([
    {
      id: "age",
      desc: true,
    },
  ]);

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 15,
  });

  const table = useReactTable({
    columns: defaultColumns,
    data,
    // initialState: {
    //   columnOrder: ["age", "firstName", "lastName"],
    //   columnVisibility: {
    //     id: false,
    //   },
    //   expanded: true,
    //   sorting: [
    //     {
    //       id: "age",
    //       desc: true,
    //     },
    //   ],
    // },
    state: {
      columnFilters,
      sorting,
      pagination,
    },
    // onColumnFiltersChange: setColumnFilters,
    // onSortingChange: setSorting,
    // onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      setPagination((old) => {
        const newPaginationValue =
          updater instanceof Function ? updater(old) : updater;
        //do something with the new pagination value
        //...
        return newPaginationValue;
      });
    },
    //syntax 2
    onSortingChange: (updater) => {
      const newSortingValue =
        updater instanceof Function ? updater(sorting) : updater;
      //do something with the new sorting value
      //...
      setSorting(updater); //normal state update
    },
  });

  const [state, setState] = React.useState({
    ...table.initialState, //populate the initial state with all of the default state values from the table instance
    pagination: {
      pageIndex: 0,
      pageSize: 15, //optionally customize the initial pagination state.
    },
  });
  table.setOptions((prev) => ({
    ...prev, //preserve any other options that we have set up above
    state, //our fully controlled state overrides the internal state
    onStateChange: setState, //any state changes will be pushed up to our own state management
  }));
  // console.log(table.getState().rowSelection);
  return (
    <div>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
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
    </div>
  );
};

export default App;
