import { TestService } from 'src/app/services/test-service.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/models/test';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/Question';
import { QuestionService } from 'src/app/services/question.service';
import { FileUploadService } from '../../../../services/fileupload.service';

@Component({
  selector: 'app-test-show',
  templateUrl: './test-show.component.html',
  styleUrls: ['./test-show.component.scss'],
})
export class TestShowComponent {
  constructor(
    private fileUploader : FileUploadService,
    private route: ActivatedRoute,
    private testService: TestService,
    private toastr: ToastrService,
    private questionService : QuestionService,
  ) {}
  updateQuestion : boolean = false;
  edit: boolean = false;
  testId: string = this.route.snapshot.params['id'];
  test!: Test;
  question : Question = {
    id: '',
    name: '',
    correct_response: '',
    response_type: '',
    responses: [],
    test_id: parseInt(this.testId),
    photo : "",
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      console.log('Selected file:', file);
       this.fileUploader.uploadQuestionPhoto(file).subscribe((response=>{this.question.photo = response}),(err) => {console.log()});
       
      // Handle the selected file here
    }
  }
  activateEdit() {
    this.edit = true;
  }
  ngOnInit() {
    this.getTest();
    this.getQuestions()
  }
  getTest() {
    this.testService.get(this.testId).subscribe(
      (response) => {
        console.log('test ===', response);
        this.test = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  responseInput : string="";
  addResponses(){
    this.question.responses.push(this.responseInput)
    this.responseInput = ''

  }
  questions : Question[] = []
  
  testTypes: string[] = ['RH', 'TECHNIQUE', 'RH_TECHNIQUE'];
  updateTest(form: NgForm) {
    console.log(form.value);
   
    this.testService.update(form.value, this.testId).subscribe(
      (response) => {
        console.log(response);
        //this.router.navigate(["/hr/tests"]);
        this.toastr.success('Test', 'Test mis a jour avec succes');
        this.edit = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateQuestionData(id : any){
    this.updateQuestion = true;
    this.question = this.questions.filter(question => question.id === id)[0];
  }
  addQuestion(form : NgForm){

    console.log("form" , this.question);
    this.questionService.store(this.question).subscribe(
      data =>{
        console.log(data);
        this.toastr.success('Question', 'Question ajoutee avec succes');
        this.getQuestions();
        this.question = {
          id: '',
          name: '',
          correct_response: '',
          response_type: '',
          responses: [],
          test_id: parseInt(this.testId),
          photo : "",
        }
        this.responseInput = "";
    }
    ,err=>{console.log(err)});
    

  }

  updateQuestionForm(form : NgForm) {
    console.log("form" , this.question);
    this.questionService.update(this.question,this.question.id).subscribe(
      data =>{
        console.log(data);
        this.toastr.success('Question', 'Question modifiee avec succes');
        this.getQuestions();
        this.question = {
          id: '',
          name: '',
          correct_response: '',
          response_type: '',
          responses: [],
          test_id: parseInt(this.testId),
          photo : "",
        }
        this.responseInput = "";
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
    this.questionService.getQuestionsByTest(this.testId).subscribe(
      data =>{
        console.log(data);
        this.questions = data;
        //this.toastr.success('Question', 'Question ajoutee avec succes');
    }
    ,err=>{console.log(err)});
    
  }
}
