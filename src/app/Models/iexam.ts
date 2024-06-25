export interface IExam {
  id: number;
  title: string;
  startDateTime: Date;
  endDateTime: Date;
  duration: number;
  type: string;
  questions: IQuestion[];
}

export interface IQuestion {
  id: number;
  header: string;
  type: string;
  points: number;
  answers: IAnswer[];
}

export interface IAnswer {
  id: number;
  header: string;
  isCorrect: boolean;
}
