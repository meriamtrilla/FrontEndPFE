import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidature } from 'src/app/models/candidature';
import { Offer } from 'src/app/models/offer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CandidatureService } from 'src/app/services/candidature.service';
import { OfferService } from 'src/app/services/offer-service.service';
import { VoiceRecognitionService } from 'src/app/services/voice-regonation.service';
import { InterviewAnswerService } from '../../../services/interviewAnswer.service';
import { UserTestService } from 'src/app/services/userTest.service';

@Component({
  selector: 'app-interviewpass',
  templateUrl: './interviewpass.component.html',
  styleUrls: ['./interviewpass.component.scss']
})
export class InterviewpassComponent {
  constructor(
    private interviewAnswerService : InterviewAnswerService,
    private voiceRecogonition : VoiceRecognitionService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private offerService: OfferService,
    private candidatureService: CandidatureService,
    private toast: ToastrService,
    private userTestService: UserTestService,
    private router: Router) {
   
  }



recording : boolean = false;



  finalTranscript = '';
  interimTranscript = '';


  startRecognition(): void {
    this.recording = true;
    this.voiceRecogonition.startListening();
    this.listenToUpdates();
  }

  stopRecognition(): void {
    this.recording = false;
     this.voiceRecogonition.stopListening();
  }

  listenToUpdates(): void {
    setInterval(() => {
      this.finalTranscript = this.voiceRecogonition.getFinalTranscript();
      this.interimTranscript = this.voiceRecogonition.getInterimTranscript();
    }, 500);
  }
 

  candId: Number = this.route.snapshot.params["id"];
  ngOnInit(): void {
    this.getCandidature();
    //this.getMyInterviews()

  }

  //userInterviews : UserInterview[] = [];
  user: User = this.auth.getCurrentUser();
  candidature: Candidature = {
    id: 0,
    user_id: 0,
    offre_id: 0,
    letter: "",
    dateCandidature: "",
    status: "New",
    cv: ""
  }
  getCandidature() {
    this.candidatureService.get(this.candId).subscribe(res => {
      console.log(res);
      this.candidature = res;
      this.getOffer()
    }, err => console.log())
  }
  offer!: Offer;
  getOffer() {
    this.offerService.get(this.candidature?.offer?.id).subscribe(
      (response) => {
        console.log('offer ===', response);
        this.offer = response;
        //this.assignRandomColors()

      },
      (error) => {
        console.log(error);
      }
    );
  }
  response: any;
  score: number = 0;
  selectedQuestion!: any;
  questionNumber: number = 1;
  total: any = 0;
  starting: boolean = false;
  finished: boolean = false;
  showedQuestions: any = [];

  correctAnswers: number = 0;  // Suivi du nombre de bonnes réponses       // Question sélectionnée
  remainingTime: number = 100; // Temps restant


  startInterview() {
    this.total = this.offer?.interview?.questions.length;
    this.selectedQuestion = this.offer?.interview?.questions[0];
    this.starting = true;

  }
  updateStatus() {
    console.log("staring update status");

    this.candidatureService.update({
      status: "After_Interview",
    }, this.candId).subscribe(data => {
      console.log("after interview", data)
    }, err => { console.log("error", err) });
  }

  

  nextQuestion() {
    //this.stopRecording()
    this.stopRecognition()
    console.log("final transition complete",this.finalTranscript);
    setTimeout(()=>{
    this.showedQuestions.push({
      question: this.selectedQuestion.name,
      response: this.finalTranscript,
    }) 
    this.interviewAnswerService.store({
      "userId" : this.user.id ,
      "questionId" : this.selectedQuestion.id,
      "answer" : this.finalTranscript
      
    }).subscribe(
      response=>{
      console.log(response);
      },
      err=>console.log(err));
  
  },1000)

    console.log("showed questions",this.showedQuestions);

 
    if (this.questionNumber == this.total) {
     
     


      setTimeout(()=>{
        this.selectedQuestion = null;
        this.finished = true;
        this.starting = false;
        this.toast.success("Entretient terminer");
        this.router.navigate(["/"]);
      },3000)
      
     
      
    }else if (this.questionNumber < this.total) {
      setTimeout(()=>{
        this.questionNumber++;
        this.selectedQuestion = this.offer?.interview?.questions[this.questionNumber - 1];
      },1500);
 
    }

   
   

  }
  // nextQuestion(){




  //  if (this.questionNumber == this.total){
  //   this.finished = true;
  //   this.starting = false;
  //   this.userInterviewService.pass({
  //     userId : this.user.id,
  //     interviewId : this.offer?.interview?.id ,
  //     score : this.score,
  //   }).subscribe(data =>{
  //     console.log("pass ==>",data);

  //     this.updateStatus()
  //   },err=>{console.log("pass ==>",err);})
  //  }

  //   //console.log("score: " , this.score);


  //   if (this.questionNumber < this.total){
  //     if ( this.response === this.selectedQuestion.correct_response ){
  //       this.score++;

  //     }
  //     this.questionNumber++;
  //     this.selectedQuestion =  this.offer?.interview?.questions[this.questionNumber - 1] ;
  //   }
  // }

  // checkInterview(){console.log("start checking...",this.userInterviews);

  //   this.userInterviews.filter(userInterview=>userInterview.id == this.offer?.interview?.id)
  //   if (this.userInterviews.length > 0){
  //     this.toast.error("You already passed this interview");
  //     this.router.navigate(["/candidate"]);
  //     return;
  //   }


  // }
  // getMyInterviews(){
  //   this.userInterviewService.getInterviewsByUser(this.user?.id).subscribe((data : any )=>{
  //     console.log("myInterviews ==>",data);
  //     this.userInterviews = data;
  //     this.checkInterview()
  //   },err=>{console.log("myInterviews ==>",err);})

  // }

}
