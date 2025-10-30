import { Component } from '@angular/core';
import { Interview } from 'src/app/models/Interview';
import { InterviewService } from 'src/app/services/interview.service';


@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent {
  constructor(private interviewService : InterviewService){}
  interviews : Interview[] = []
  getInterviews(){
    this.interviewService.all().subscribe(
      (response) => {
        console.log(response);
        this.interviews = response
      },
      (error) => {
        console.error('Fetch failed', error);
      }
    );
  }
  
  
  ngOnInit(){
    this.getInterviews()

  }

  searchQuery : string = ''
  searchinterviews(){
    this.interviews = this.interviews.filter(Interview => Interview.title.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()))
  }
}
