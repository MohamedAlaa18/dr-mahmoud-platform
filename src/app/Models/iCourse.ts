import { IExam } from "./iexam";

export interface ICourse {
  id: number;
  title: string;
  description: string;
  code: string;
  price: number;
  isActive: boolean;
  photoLink: string;
  lectures?: ILecture[];
}
export interface ILecture {
  id: number;
  title: string;
  description: string;
  code: string;
  courseId: number;
  hasPreExam: boolean;
  isActive: boolean;
  attachments?: IAttachment[];
  exams?: IExam[];
}

export interface IAttachment {
  id: number;
  fileName: string;
  extension: string;
  mimeType: string;
  size: number;
  lectureId: number;
  physicalName: string;
  url: string;
}
export interface ISubject {
  id?: number;
  subjectName: string;
}
