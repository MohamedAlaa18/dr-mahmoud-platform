export interface IExamResult {
  submitResult: string;
  examName: string;
  examType: string;
  examGrade: number;
  studentGrade: number;
  studentAnswersWithCorrectAnswers: Question[];
}

export interface Question {
  questionId: number;
  questionHeader: string;
  questionType: string;
  answerChoices: AnswerChoices[];
  studentAnswerIds: number[];
  correctAnswerIds: number[];
  isCorrect: boolean;
}

export interface AnswerChoices {
  answerId: number;
  answerHeader: string;
}
