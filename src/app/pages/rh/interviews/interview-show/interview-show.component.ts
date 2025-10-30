import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Interview } from 'src/app/models/Interview';
import { Question } from 'src/app/models/Question';
import { InterviewService } from 'src/app/services/interview.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-interview-show',
  templateUrl: './interview-show.component.html',
  styleUrls: ['./interview-show.component.scss']
})
export class InterviewShowComponent {
  constructor(
    private route: ActivatedRoute,
    private interviewService: InterviewService,
    private toastr: ToastrService,
    private questionService : QuestionService,
  ) {}
  edit: boolean = false;
  editQuestion : boolean = false;
  interviewId: string = this.route.snapshot.params['id'];
  interview!: Interview;
  question : Question = {
    photo : "",
    id: '',
    name: '',
    correct_response: '',
    response_type: '',
    responses: [],
    interview_id: parseInt(this.interviewId),
    test_id : parseInt("")
  }
  activateEdit() {
    this.edit = true;
    
  }
  activateEditQuestion(q : any) {
   this.editQuestion = true;
    this.question = q;
  }
  ngOnInit() {
    this.getInterview();
    this.getQuestions()
  }
  getInterview() {
    this.interviewService.get(this.interviewId).subscribe(
      (response) => {
        console.log('interview ===', response);
        this.interview = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  responseInput : string="";
  addResponses(){
    if (this.responseInput.length > 0) {
 this.question.responses.push(this.responseInput)
    this.responseInput = ''
    }
   

  }
  questions : Question[] = []
  
  interviewTypes: string[] = ['RH', 'TECHNIQUE', 'RH_TECHNIQUE'];
  updateInterview(form: NgForm) {
    console.log(form.value);
   
    this.interviewService.update(form.value, this.interviewId).subscribe(
      (response) => {
        console.log(response);
        //this.router.navigate(["/hr/interviews"]);
        this.toastr.success('Interview', 'Interview mis a jour avec succes');
        this.edit = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addQuestion(form : NgForm){

    console.log("form" , this.question);
    this.questionService.store(this.question).subscribe(
      data =>{
        console.log(data);
        this.toastr.success('Question', 'Question ajoutee avec succes');
        this.getQuestions();
      // reset question data
        this.question.name = "";
        this.question.correct_response = "";
        this.question.response_type = "";
        this.question.responses = [];
        
    }
    ,err=>{console.log(err)});
    

  }

  updateQuestionForm(questionForm : NgForm){
    console.log("form" , this.question);
    this.questionService.update(this.question,this.question.id).subscribe(
      data =>{
        console.log(data);
        this.toastr.success('Question', 'Question modifiee avec succes');
        this.getQuestions();
      // reset question data
        this.question.name = "";
        this.question.correct_response = "";
        this.question.response_type = "";
        this.question.responses = [];
        
    }
    ,err=>{console.log(err)});
  }

  deleteQuestion(idQuestion : string){

    //console.log("form" , this.question);
    this.questionService.delete(idQuestion).subscribe(
      data =>{
        console.log(data);
        this.toastr.success('Question', 'Question supprimer avec succes');
        this.getQuestions();
    }
    ,err=>{console.log(err)});
    

  }

  getQuestions(){
    this.questionService.getQuestionsByInterview(this.interviewId).subscribe(
      data =>{
        console.log(data);
        this.questions = data;
        //this.toastr.success('Question', 'Question ajoutee avec succes');
    }
    ,err=>{console.log(err)});
    
  }
}
