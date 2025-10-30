import { Component } from '@angular/core';
import { CandidatureService } from 'src/app/services/candidature.service';
import { UserServiceService } from '../../../services/user-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Candidature } from 'src/app/models/candidature';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-my-candidates',
  templateUrl: './my-candidates.component.html',
  styleUrls: ['./my-candidates.component.scss']
})
export class MyCandidatesComponent {

  constructor(private auth : AuthService ,private candidateService : CandidatureService, private toast:ToastrService){}
  ngOnInit(){
this.getMyCandidates()
  }
  candidates : Candidature[] = []
user  : User =  this.auth.getCurrentUser();
  getMyCandidates(){
this.candidateService.getMyCandidates(this.user.id).subscribe(candidates =>{
console.log(candidates);
this.candidates = candidates.filter((c: Candidature) => c.offer?.status === true);
;

},err => {
  console.log(err);
  
});
  }

  
  cancelCandidature(candidateId: number) {
    if (confirm('Êtes-vous sûr de vouloir annuler cette candidature ?')) {
      this.candidateService.delete(candidateId).subscribe(
        () => {
          // Update the list of candidates after deletion
          this.candidates = this.candidates.filter(c => c.id !== candidateId);
          this.toast.success("Candidature annulée avec succès");
        },
        (err) => {
          console.error(err);
          alert('Une erreur s\'est produite lors de l\'annulation de la candidature.');
        }
      );
    }
  }
  

}
