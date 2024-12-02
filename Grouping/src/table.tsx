import { createColumnHelper } from "@tanstack/react-table";
import { Person } from "./makeData";

const columnHelper = createColumnHelper<Person>();

export const defaultColumns = [
  columnHelper.group({
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        getGroupingValue: (row) => `${row.firstName} ${row.lastName}`,
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
        aggregatedCell: ({ getValue }) =>
          Math.round(getValue<number>() * 100) / 100,
        aggregationFn: "median",
      }),
      columnHelper.group({
        header: "More info",
        columns: [
          columnHelper.accessor("visits", {
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
            aggregationFn: "sum",
          }),
          columnHelper.accessor("status", {
            header: () => "Status",
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("progress", {
            header: "Profile Progress",
            footer: (props) => props.column.id,
            aggregatedCell: ({ getValue }) =>
              Math.round(getValue<number>() * 100) / 100 + "%",
            cell: ({ getValue }) =>
              Math.round(getValue<number>() * 100) / 100 + "%",
            aggregationFn: "mean",
          }),
        ],
      }),
    ],
  }),
];
