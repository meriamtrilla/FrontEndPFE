import { Component } from '@angular/core';
import { CandidatureService } from '../../../services/candidature.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidature } from 'src/app/models/candidature';
import { OfferService } from 'src/app/services/offer-service.service';
import { Offer } from 'src/app/models/offer';
import { Question } from 'src/app/models/Question';
import { UserTestService } from 'src/app/services/userTest.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UserTest } from 'src/app/models/userTest';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-testpass',
  templateUrl: './testpass.component.html',
  styleUrls: ['./testpass.component.scss']
})
export class TestpassComponent {

  timeInMinutes: number = 0; // Start time in minutes
  remainingTime!: number;     // Remaining time in seconds
  displayTime: string = '';  // Display time in MM:SS format
  timer: any;                // Timer reference
  timerFinished: boolean = false;
  correctAnswers: number = 0;  // Déclaration de correctAnswers pour suivre les bonnes réponses
  score: number = 0;
  questionNumber: number = 1;
  total: number = 10; 
   
  

  startTimer(): void {
    this.remainingTime = this.timeInMinutes * 60; // Convert minutes to seconds
    this.updateDisplayTime(); // Update initial display

    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--; // Decrement time
        this.updateDisplayTime();
      } else {
        clearInterval(this.timer); // Stop the timer
        this.timerFinished = true; // Mark timer as finished
        this.onTimerFinish(); // Call a custom function
      }
    }, 1000);
  }

  updateDisplayTime(): void {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    this.displayTime = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  onTimerFinish(): void {
    console.log('Timer finished! Triggering custom action...');
    // Add custom actions here, like changing a variable or updating UI

    this.finished = true;
    this.starting = false;

    this.userTestService.pass({
      userId : this.user.id,
      testId : this.offer?.test?.id ,
      score : this.score,
    }).subscribe(data =>{
      console.log("pass ==>",data);
     
      this.updateStatus()
    },err=>{console.log("pass ==>",err);})

  }

  constructor(private auth : AuthService,
    private route : ActivatedRoute ,
    private offerService : OfferService,
    private  candidatureService : CandidatureService,
  private userTestService : UserTestService,
private toast : ToastrService,
private router : Router) { }
  candId : Number = this.route.snapshot.params["id"];
  ngOnInit(): void {
    
    this.getCandidature();
    this.getMyTests()

  }

  userTests : UserTest[] = [];
  user : User = this.auth.getCurrentUser();
  candidature : Candidature = {
    id: 0,
    user_id: 0,
    offre_id: 0,
    letter: "",
    dateCandidature: "",
    status: "New",
    cv : ""
  }
  getCandidature(){
  
    
    this.candidatureService.get(this.candId).subscribe(res => {
      console.log("Get candidature" ,this.candId, res);
      this.candidature = res;
      this.getOffer()
    },err=>console.log())
  }
  offer!: Offer;
  getOffer(){
    this.offerService.get(this.candidature?.offer?.id).subscribe(
      (response) => {
        console.log('offer ===', response);
        this.offer = response;
        this.timeInMinutes = response?.test?.dure
        //this.assignRandomColors()
        
      },
      (error) => {
        console.log(error);
      }
    ); 
  }
  response : any;
  
  selectedQuestion! : any ;
  starting : boolean = false;
  finished : boolean = false;
  startTest(){
    this.startTimer();
   this.total = this.offer?.test?.questions.length ?? 0;
    this.selectedQuestion =  this.offer?.test?.questions[0] ;
    this.starting = true;
  }
 
  
  nextQuestion() {
    // Vérifier si c'est la dernière question
    if (this.questionNumber == this.total) {
      // Calculer le score basé sur le nombre de bonnes réponses
      if (this.response === this.selectedQuestion.correct_response) {
        this.correctAnswers++;
      }
  
      // Calculer le score final sur la base des bonnes réponses
      const percentageCorrect = (this.correctAnswers / this.total) * 100;
  
      // Ajouter un bonus en fonction du temps restant
      const timeBonus = this.remainingTime * 0.1; // Exemple de bonus basé sur le temps
      this.score = percentageCorrect + timeBonus;
  
      console.log("Score basé sur les bonnes réponses:", percentageCorrect);
      console.log("Bonus temps:", timeBonus);
      console.log("Score final:", this.score);
  
      // Fin du test
      this.finished = true;
      this.starting = false;
  
      // Envoi des résultats
      this.userTestService.pass({
        userId: this.user.id,
        testId: this.offer?.test?.id,
        score: this.score,
      }).subscribe(data => {
        console.log("Pass ==>", data);
  
        // Mise à jour du statut après la soumission du test
        this.updateStatus();  // Appel de la méthode pour mettre à jour le statut
      }, err => {
        console.log("Erreur Pass ==>", err);
      });
    }
  
    // Si ce n'est pas la dernière question, passer à la suivante
    if (this.questionNumber < this.total) {
      if (this.response === this.selectedQuestion.correct_response) {
        this.correctAnswers++;
      }
      this.questionNumber++;
      this.selectedQuestion = this.offer?.test?.questions[this.questionNumber - 1];
    }
  }
  
  candidateStatus: string = 'After_Test'; // Statut initial par défaut après test

// Méthode pour mettre à jour le statut du candidat
updateStatus() {
  console.log("Starting update status");

  // Vérification si candId existe avant d'effectuer l'appel API
  if (!this.candId) {
    console.error("Error: Candidate ID is missing!");
    return;
  }

  // Envoi du statut sélectionné à l'API
  this.candidatureService.update({
    status: this.candidateStatus,  // Utilisation du statut sélectionné par l'utilisateur
  }, this.candId).subscribe(
    (data) => {
      console.log("Status updated successfully:", data);
    },
    (err) => {
      console.error("Error during status update:", err);
      // Affichage plus détaillé de l'erreur
      if (err.error) {
        console.error("Error message:", err.error);
      } else {
        console.error("Unknown error:", err);
      }
    }
  );
}

// Méthode de fin de test pour garantir le statut "After_Test"
onTestComplete() {
  // Mettre le statut à "After_Test" après le test
  this.candidateStatus = 'After_Test'; // Toujours après test
  this.updateStatus(); // Envoi de la mise à jour du statut au backend
}
  
checkTest(){console.log("start checking...",this.userTests);

  this.userTests.filter(userTest=>userTest.id == this.offer?.test?.id)
  if (this.userTests.length > 0){
    this.toast.error("You already passed this test");
    this.router.navigate(["/candidate"]);
    return;
  }
     
   
}
  getMyTests(){
    this.userTestService.getTestsByUser(this.user?.id).subscribe((data : any )=>{
      console.log("myTests ==>",data);
      this.userTests = data;
      this.checkTest()
    },err=>{console.log("myTests ==>",err);})
   
  }
}
