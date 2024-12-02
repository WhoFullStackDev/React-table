export const normalData = [
  {
    firstName: "Tanner",
    lastName: "Linsley",
    age: 33,
    visits: 100,
    progress: 50,
    status: "Married",
  },
  {
    firstName: "Kevin",
    lastName: "Vandy",
    age: 27,
    visits: 200,
    progress: 100,
    status: "Single",
  },
];

export const DeepKeyedData = [
  {
    name: {
      first: "Tanner",
      last: "Linsley",
    },
    info: {
      age: 33,
      visits: 100,
    },
  },
  {
    name: {
      first: "Kevin",
      last: "Vandy",
    },
    info: {
      age: 27,
      visits: 200,
    },
  },
];

export const Nested_Sub_Row_Data = [
  {
    firstName: "Tanner",
    lastName: "Linsley",
    subRows: [
      {
        firstName: "Kevin",
        lastName: "Vandy",
      },
      {
        firstName: "John",
        lastName: "Doe",
        subRows: [
          //...
        ],
      },
    ],
  },
  {
    firstName: "Jane",
    lastName: "Doe",
  },
];
