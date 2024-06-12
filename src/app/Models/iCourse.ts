export interface ICourse {
  id: number,
  courseName: string,
  thumbnail: string,
  courseType: string,
  price: number,
  aboutTeacher?:string,
  profilePhoto: string,
  levelName: string,
  lectureList?: ILecture[]
}

export interface ILecture {
  id: number,
  lectureTitle: string,
  price: number,
  courseId: number,
  videos?: IVideo[],
  attachments?: IAttachment[],
  preExam?: number,
  assignment?: number
}

export interface IVideo {
  id?: number,
  videoTitle: string,
  videoPath: string
}

export interface IAttachment {
  id?: number,
  attachmentTitle: string,
  attachmentPath: string
}

export interface ISubject {
  id?: number,
  subjectName: string,
}
