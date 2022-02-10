export interface IStudent {
  id?: number;
  name: string;
  spec: string;
  group: number;
  year: number;
}

export interface ICompany {
  id?: number;
  name: string;
}

export interface IStudentEvent {
  id?: number;
  date: string;
  text: string;
  company: ICompany | null;
  student: IStudent;
}

export interface ISpec {
  name: string;
}
