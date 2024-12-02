import { createColumnHelper, FilterFn } from "@tanstack/react-table";
import { Person } from "./makeData";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

const columnHelper = createColumnHelper<Person>();

export const defaultColumns = [
  columnHelper.group({
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: "includesStringSensitive",
      }),
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
        filterFn: "includesString",
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
        meta: { filterVariant: "range" },
      }),
      columnHelper.group({
        header: "More info",
        columns: [
          columnHelper.accessor("visits", {
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
            meta: { filterVariant: "range" },
          }),
          columnHelper.accessor("status", {
            header: () => "Status",
            footer: (props) => props.column.id,
            meta: { filterVariant: "select" },
          }),
          columnHelper.accessor("progress", {
            header: "Profile Progress",
            footer: (props) => props.column.id,
            meta: { filterVariant: "range" },
          }),
        ],
      }),
    ],
  }),
];
