//TData
export type User = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
};

export type DeepKeyedUser = {
  name: {
    first: string;
    last: string;
  };
  info: {
    age: number;
    visits: number;
  };
};

export type NestedSubRowUser = {
  firstName: string;
  lastName: string;
  subRows?: User[]; //does not have to be called "subRows", can be called anything
};
