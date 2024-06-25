import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AnswerChoices, IExamResult } from 'src/app/Model/iexam-result';


@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent implements OnInit {
  result!: IExamResult;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.route.queryParams.subscribe(params => {
      if (params['result']) {
        this.result = JSON.parse(params['result']);
      }
    });
  }

  getAnswerChoices(answerChoices: AnswerChoices[]): string[] {
    return answerChoices.map(choice => choice.answerHeader);
  }

  getStudentAnswers(studentAnswerIds: number[], answerChoices: AnswerChoices[]): string {
    const selectedAnswers: string[] = [];

    for (const studentAnswerId of studentAnswerIds) {
      const choices = answerChoices.filter(choice => choice.answerId === studentAnswerId);

      if (choices.length > 0) {
        for (const choice of choices) {
          selectedAnswers.push(choice.answerHeader);
        }
      } else {
        selectedAnswers.push(`No answer found for ID ${studentAnswerId}`);
      }
    }

    return selectedAnswers.join(', ');
  }

  getCorrectAnswers(correctAnswerIds: number[], answerChoices: AnswerChoices[]): string {
    const correctAnswers: string[] = [];

    for (const correctAnswerId of correctAnswerIds) {
      const choices = answerChoices.filter(choice => choice.answerId === correctAnswerId);

      if (choices.length > 0) {
        for (const choice of choices) {
          correctAnswers.push(choice.answerHeader);
        }
      } else {
        correctAnswers.push(`No answer found for ID ${correctAnswerId}`);
      }
    }

    return correctAnswers.join(', ');
  }

  parseIds(ids: (string | number)[]): number[] {
    return ids.map(id => typeof id === 'string' ? parseInt(id, 10) : id);
  }

  isAnswerCorrect(studentAnswerIds: number[], correctAnswerIds: number[]): boolean {
    return JSON.stringify(studentAnswerIds.sort()) === JSON.stringify(correctAnswerIds.sort());
  }

  isCorrectChoice(choice: string, correctAnswerIds: number[]): boolean {
    return correctAnswerIds.includes(parseInt(choice, 10));
  }
}
