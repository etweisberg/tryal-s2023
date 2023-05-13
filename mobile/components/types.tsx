import { Trial } from "../utils/types";

export type DataItem = {
    id: string;
    title: string;
    description: string;
  };

export type DataItemObj = {
  name: string;
  studies: DataItem[];
}

export type TrialListObj = {
  name: string;
  studies: Trial[];
}

export type MyObject = {
    [key: string]: Array<any>;
  }