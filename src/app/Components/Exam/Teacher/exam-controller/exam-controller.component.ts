import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-exam-controller',
  templateUrl: './exam-controller.component.html',
  styleUrls: ['./exam-controller.component.css']
})
export class ExamControllerComponent implements OnInit {

  @Output() sectionChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() activeSection!: string;


  setActiveSection(section: string): void {
    this.activeSection = section;
    this.sectionChange.emit(section);
  }

  ngOnInit(): void {
    this.setActiveSection('questionSettings');
  }
}
