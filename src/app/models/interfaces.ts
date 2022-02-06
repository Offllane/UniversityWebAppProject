export interface Student {
  id: number;
  name: string;
  spec: string;
  group: number;
  year: number;
}

export interface Company {
  id: number;
  name: string;
}

export interface StudentEvent {
  id: number;
  date: string;
  text: string;
  company: Company | null;
  student: Student;
}
