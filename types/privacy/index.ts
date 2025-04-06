export interface Section {
  id: string;
  title: string;
  content: any[];
}

export interface PolicyData {
  _id: string;
  sections: Section[];
}
