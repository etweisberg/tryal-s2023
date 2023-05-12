export type DataItem = {
    id: string;
    title: string;
    description: string;
  };

export type DataItemObj = {
  name: string;
  studies: DataItem[];
}

export type MyObject = {
    [key: string]: Array<any>;
  }