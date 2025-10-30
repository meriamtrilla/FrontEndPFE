import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InterviewService } from 'src/app/services/interview.service';

@Component({
  selector: 'app-interview-create',
  templateUrl: './interview-create.component.html',
  styleUrls: ['./interview-create.component.scss'],
})
export class InterviewCreateComponent {
  constructor(
    private interviewService: InterviewService,
    private router: Router
  ) {}

  addInterview(form: NgForm) {
    console.log(form.value);

    this.interviewService.store(form.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/hr/interviews/'+response.id+'/show']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
