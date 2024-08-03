export interface IExam {
  id: number;
  title: string;
  description: string;
  type: number;
  startDate: string; // ISO 8601 date string
  dueDate: string; // ISO 8601 date string
  duration: number; ////////////////////
  isActive: boolean;
  questions?: IQuestion[];
}
// export interface IExam {
//   id: number;
//   title: string;
//   startDateTime: Date;
//   endDateTime: Date;
//   duration: number;
//   type: string;
//   questions: IQuestion[];
// }

export interface IQuestion {
  id: number;
  header: string;
  type: string;
  points: number;
  answers: IAnswer[];
  imageFile: [];
}

export interface IAnswer {
  id: number;
  header: string;
  isCorrect: boolean;
  imageFile: [];
}
