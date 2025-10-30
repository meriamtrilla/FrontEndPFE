import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidature } from 'src/app/models/candidature';
import { Offer } from 'src/app/models/offer';
import { User } from 'src/app/models/user';
import { CandidatureService } from 'src/app/services/candidature.service';
import { NotificationService } from 'src/app/services/Notification.service';
import { OfferService } from 'src/app/services/offer-service.service';
import { MeetingService } from '../../../../services/meeting.service';
import { EmailService } from '../../../../services/Email.service';
import { Meeting } from 'src/app/models/meeting';
import { UserServiceService } from '../../../../services/user-service.service';
import { InterviewAnswerService } from 'src/app/services/interviewAnswer.service';
import { IAModelService } from 'src/app/services/IAModel.service';
import { SmsService } from './../../../../services/sms.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent {
  constructor(
private IAModel : IAModelService,
    private responseService: InterviewAnswerService,
    private userService : UserServiceService,
    private meetingService: MeetingService,
    private emailService: EmailService,
    private candidatureService: CandidatureService,
    private route: ActivatedRoute,
    private offerService: OfferService,
    private toastr: ToastrService,
    private notificationService: NotificationService,
    private SmsService:SmsService
  ) { }
  edit: boolean = false;
  offerId: Number = this.route.snapshot.params['id'];
  offer!: Offer;
  ngOnInit() {

    this.getOffer();
    this.getAllCandidatures();
  
   

  }
  getOffer() {
    this.offerService.get(this.offerId).subscribe(
      (response : any) => {
        console.log('offer ===', response);
        this.offer = response;
        this.localCandidatures = response?.candidatures;
        //this.assignRandomColors()

      },
      (error) => {
        console.log(error);
      }
    );
  }
  candidatures: Candidature[] = []
  getAllCandidatures() {
    this.candidatureService.all().subscribe(
      (response) => {
        console.log('candidatures ===', response);
        this.candidatures = response;
        this.getAll()
      },
      (error) => {
        console.log(error);
      }
    );
  }
users : any;
  getScore(id: any) {
  console.log("log this is offer test", this.offer?.test?.id);

  // Vérification de la disponibilité des utilisateurs
  const user = this.users.find((user: any) => user.id == id);
  if (!user) {
    console.error(`Utilisateur avec l'ID ${id} non trouvé.`);
    return "";
  }

  // Vérification des tests associés à l'utilisateur
  console.log("ID du test de l'offre :", this.offer?.test?.id);
console.log("Tests de l'utilisateur :", user.userTests);

  
  // Vérification de l'offre et du test
  if (!this.offer || !this.offer.test) {
    console.error("Offre ou test non défini.");
    return "";
  }
  
  // Trouver le test correspondant
  const userTest = user.userTests.find(
    (userTest: any) => userTest?.test?.id === this.offer?.test?.id
  ) || user.userTests[0]; // Si aucun test n'est trouvé, prendre le premier test
  
  if (!userTest) {
    console.error(`Aucun test correspondant trouvé pour l'ID ${id} et l'offre ${this.offer?.test?.id}.`);
    return "";
  }

  console.log("score", userTest?.score);
  
  return userTest?.score !== undefined ? userTest.score : 0;
}




  getUser(id: Number): any {
    let c;


    this.candidatures.map((candidate) => {
      if (candidate.id === id) {
        c = candidate?.user;
        console.log("candidature user" , c);
      }
    })
    return c;
  }

  activeCandidate!: Candidature;

  updateCandidatureStatus(candidate: any) {

    if (candidate.status === "Place_Interview") {
      this.activeCandidate = candidate;
      this.openModal()

    } else {
      this.candidatureService.update(candidate, candidate.id).subscribe(candidate => {
        console.log(candidate);
        this.addNotification(candidate)
        this.toastr.success('Status updated successfully!', 'Success!');
      }, err => {
        console.log("err", err);

      });
    }



  }

  addNotification(c: any) {
    console.log("notif", {
      content: c.id,
      type: c.status,
      user_id: this.getUser(c.id)?.id
    });

    this.notificationService.store({
      content: c.id,
      type: c.status,
      user_id: this.getUser(c.id)?.id
    }).subscribe(notification => {
      console.log(notification);

    }, err => {
      console.log(err);
    })
  }

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit(form: Meeting) {
    console.log("data", form);
    form.user_id = this.getUser(this.activeCandidate.id)?.id;
    form.offer_id = this.offerId;
    this.meetingService.store(
      form
    ).subscribe(meeting => {
      console.log("meeting added ...");

      this.emailService.mail({
        to: this.getUser(this.activeCandidate.id)?.username,
        subject: "Inviation a une reunion",
        content: `${this.getUser(this.activeCandidate.id)?.phone }
        Suite à l'étude de votre candidature pour le poste de ${this.offer.title} au sein de notre société BeeCoders,
         nous avons le plaisir de vous convier à un entretien en présentiel.
          Cet échange aura lieu le ${form.date} à ${form.time}, dans nos locaux.
           Lors de cet entretien, nous aurons l’occasion de discuter de votre parcours, 
           de vos compétences ainsi que des attentes relatives au poste que nous proposons.
Nous vous remercions de bien vouloir confirmer votre disponibilité pour cette rencontre en 
répondant à cet e-mail ou en nous contactant directement par téléphone au ${this.getUser(this.activeCandidate.id)?.phone }.
 Si vous avez besoin d’informations supplémentaires ou de précisions concernant le déroulement de cet entretien, 
 n’hésitez pas à revenir vers nous.
Nous restons à votre disposition et nous vous souhaitons une excellente journée.`,
      }).subscribe(email => {
        console.log("email sent ", email);

      }, err => { console.log(err) });
    }, err => { console.log(err) });
    // send email
    this.SmsService.store({
      number: "+21656489821",
      msg:`pour la candidature de ${this.offer.title} aprés un examen attentif de votre candidature, vous étes passé à l'étape suivante, qui consiste en un entretient en personne l'entretient se tiendra le ${form.date} à ${form.time} à notre bureau situé a Parc technologique el Ghazel Ariana`
    }).subscribe(data=>{},error=>{})



    this.closeModal();
  }
  localCandidatures : any ;
  filter : string = 'All';
  updateList(){
     
    this.localCandidatures = this.offer?.candidatures?.filter(item => item.status.toLowerCase().includes(this.filter.toLowerCase()));
    console.log(this.localCandidatures);
    console.log(this.filter); 
  } 

  getAll(){
    this.userService.getAll().subscribe(res =>{
      console.log(res);
      this.users = res;
      this.getAllProfile()
      
    }, err =>{});
  }


  answers : any;
  IAdata : any = [] ;
  getResponsesUser(userId : number){
    this.responseService.getResponsesByUser(this.offer?.interview?.id ,userId).subscribe(res =>{
console.log("responses" , res);
this.answers = res;
this.evaluateAllAnswers()
    },err=>{
console.log("error" , err);

    });
  }
 
evaluateAllAnswers(){
  this.IAdata = []
    this.answers.map((answer : any )=>{
      this.IAModel.evaluate_answer(answer.answer, answer.question.responses).subscribe(
        res =>{
          console.log("result" , res);
          this.IAdata.push({ question : answer.question.name , response : answer.answer , iadata : res}) ;
          this.openModal1()
        },
        err=>{
          console.log("error" , err);
        }
      )
    })

    console.log("IAdata" , this.IAdata);
    
}

skillsToArray(skills : any){
  let lskills : String[] = []
  skills.forEach((skill : any)=>{
    lskills.push(`${skill.name}`)
  }); 
  return lskills;

}

bestCandidates : any = [];

bestProfiles(){
  let o = {"experience" : this.offer.experience.toString() , "competence" : this.offer.skills.split(",")  };
  let profiles : any = [];
  this.candidates.forEach((candidate : any)=>{
    profiles.push({...candidate , "experience" : candidate?.experience?.toString() ,"competences" : this.skillsToArray(candidate.skills)})
  });
  console.log("profiles" , profiles , o);
  
  this.IAModel.meilleur_candidate(
    
    profiles,o,this.offer.number_post
    
  ).subscribe((res)=>{
    this.bestCandidates = res;
    console.log(res);
  },err=>{console.log(err);
  });
}
  showUserResult(user_id : number){
    console.log("interview" , this.offer?.interview?.id);
    
    this.getResponsesUser(user_id);
   
    
  }

  // IA model
  isModalOpen1 = false;

  openModal1() {
    this.isModalOpen1 = true;
  }

  closeModal1() {
    this.isModalOpen1 = false;
  }

  onSubmit1(form:any) {
    console.log("data", form);
    




    this.closeModal1();
  }

candidates : User[] = [];
  getAllProfile(){
    console.log("start getAllProfile");
    
    this.offer?.candidatures?.forEach((candidature : Candidature)=>{

      this.candidatures.forEach((c : Candidature)=>{
        if(candidature.id == c.id){
          this.users.forEach((user : User) => {
            console.log("testing here",user,c);
            
            if(user.id == c?.user?.id){
              console.log("push" , user);
              this.candidates.push(user);
              
            }
            
          });
        }
        
       
      })
      
    })

    console.log(this.candidates);
    this.bestProfiles()
    
  }

  getMyCandidate(userId : any) : any {
    let data = null;
    let usercandidatures = this.candidatures.filter((candidate : any )=>candidate?.user.id == userId);
    usercandidatures.forEach((userC : any) => {
      this.offer.candidatures?.forEach((candidate : any)=>{
        console.log("testing c " , candidate , userC);
        
      if ( candidate.id == userC.id) {
        console.log("yser c" , userC);
        
         data =userC;
      }

      })
    })
    return data;

  }


}
