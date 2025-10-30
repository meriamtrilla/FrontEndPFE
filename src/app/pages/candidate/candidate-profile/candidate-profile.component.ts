import { IntrestService } from './../../../services/intrest.service';
import { MembershipService } from './../../../services/membership.service';
import { ExperienceService } from './../../../services/experience.service';
import { SkillService } from './../../../services/skill.service';
import { Education } from 'src/app/models/Education';
import { EducationService } from 'src/app/services/education.service';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Skill } from 'src/app/models/Skill';
import { LanguageService } from 'src/app/services/language.service';
import { Language } from 'src/app/models/language';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { Experience } from 'src/app/models/Experience';
import { Membership } from 'src/app/models/Membership';
import { Intrest } from 'src/app/models/intrest';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent {
  constructor(private userService: UserServiceService,
    private intrestService : IntrestService ,
    private membershipService : MembershipService ,
     private courseService : CourseService,
    private experienceService : ExperienceService ,
     private languageService: LanguageService,
      private skillService: SkillService,
       private educationService: EducationService,
        private authService: AuthService,
      private tostr : ToastrService) { }
  user: User = this.authService.getCurrentUser();
  intrests: Intrest[] = []
  educations: Education[] = []
  skills: Skill[] = []
  languages: Language[] = []
  courses: Course[] = []
  experiences: Experience[] = []
  memberships: Membership[] = []
  score : number = 0;
  calculerScore(){
    this.score = 20;
    if (this.skills.length > 0) {
    this.score += 10; 
    }
    if (this.languages.length > 0) {
      this.score += 10; 
    }
    if (this.experiences.length > 0) {
      this.score += 10; 
    }
    if (this.memberships.length > 0) {
      this.score += 10; 
    }
    if (this.courses.length > 0) {
      this.score += 10; 
      }
      if (this.intrests.length > 0) {
        this.score += 10; 
      }
      if (this.educations.length > 0) {
        this.score += 10; 
      }
      if (this.user.avatar) {
        this.score += 10; 
      }
      
  }
  ngOnInit() {
    
    this.getMyEducations()
    this.getMySkills()
    this.getMyLanguages()
    this.getMyCourses()
    this.getMyExperiences()
    this.getMyMemberships()
    this.getMyIntrests()
    setTimeout(() => {
      this.calculerScore()
    }, 1000);
  }
  getMyEducations() {
    this.educationService.getEducationsByUser(this.authService.getCurrentUser()?.id).subscribe(
      data => {
        console.log(data);
        this.educations = data;
      },
      err => { console.log(err) }
    )
  }
  getMySkills() {
    this.skillService.getskillsByUser(this.authService.getCurrentUser()?.id).subscribe(
      data => {
        console.log(data);
        this.skills = data;
      },
      err => { console.log(err) }
    )
  }
  getMyLanguages() {
    this.languageService.getlanguagesByUser(this.authService.getCurrentUser()?.id).subscribe(
      data => {
        console.log(data);
        this.languages = data;
      },
      err => { console.log(err) }
    )
  }

  getMyExperiences() {
    this.experienceService.getExperiencesByUser(this.authService.getCurrentUser()?.id).subscribe(
      data => {
        console.log(data);
        this.experiences = data;
      },
      err => { console.log(err) }
    )
  }

  getMyCourses() {
    this.courseService.getCoursesByUser(this.authService.getCurrentUser()?.id).subscribe(
      data => {
        console.log(data);
        this.courses = data;
      },
      err => { console.log(err) }
    )
  }

  getMyMemberships() {
    this.membershipService.getMembershipsByUser(this.authService.getCurrentUser()?.id).subscribe(
      data => {
        console.log(data);
        this.memberships = data;
      },
      err => { console.log(err) }
    )
  }

  getMyIntrests() {
    this.intrestService.getIntrestsByUser(this.authService.getCurrentUser()?.id).subscribe(
      data => {
        console.log(data);
        this.intrests = data;
      },
      err => { console.log(err) }
    )
  }

  selectedFile: File | null = null;
  // For image preview
  userId = this.authService.getCurrentUser()?.id; // Assuming you have a way to get the user's ID from the current user.
imageProfile = this.authService.getCurrentUser()?.avatar ? "http://localhost:8080"+ this.authService.getCurrentUser()?.avatar : "assets/user.png" ;
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    
  }

  uploadAvatar() {
    if (this.selectedFile) {
      this.userService.uploadAvatar(this.userId, this.selectedFile).subscribe((avatarUrl) => {
        this.userService.updateAvatar(this.userId, avatarUrl).subscribe(
          (data : any) => {
          console.log(data);
          localStorage.setItem('user',JSON.stringify(data));
          this.imageProfile= "http://localhost:8080"+data.avatar;
          this.calculerScore()
        },(err)=> {console.log(err);
        });
      });
    }
  }

  deleteEducation(id : any){
    if ( confirm("Are you sure you want to delete ?")){
      this.educationService.delete(id).subscribe(
        data => {
          console.log(data);
          this.tostr.success("Education supprimee avec succes","Suppression");
          this.getMyEducations()
        },
        err => { console.log(err) }
      )
      }
  

  }

  deleteSkill(id : any){
    if ( confirm("Are you sure you want to delete ?")){
      this.skillService.delete(id).subscribe(
        data => {
          console.log(data);
          this.tostr.success("Competence supprimee avec succes","Suppression");
          this.getMySkills()
        },
        err => { console.log(err) }
      )
      }
  

  }

  deleteMembership(id : any){
    if ( confirm("Are you sure you want to delete ?")){
      this.membershipService.delete(id).subscribe(
        data => {
          console.log(data);
          this.tostr.success("Adhesion supprimee avec succes","Suppression");
          this.getMyMemberships()
        },
        err => { console.log(err) }
      )
      }
  

  }
  deleteCourse(id : any){
    if ( confirm("Are you sure you want to delete ?")){
      this.courseService.delete(id).subscribe(
        data => {
          console.log(data);
          this.tostr.success("Formation supprimee avec succes","Suppression");
          this.getMyCourses()
        },
        err => { console.log(err) }
      )
      }
  

  }
  deleteIntrest(id : any){
    if ( confirm("Are you sure you want to delete ?")){
      this.intrestService.delete(id).subscribe(
        data => {
          console.log(data);
          this.tostr.success("Intérêt supprime avec succes","Suppression");
          this.getMyIntrests()
        },
        err => { console.log(err) }
      )
      }
  

  }
  deleteLanguage(id : any){
    if ( confirm("Are you sure you want to delete ?")){
      this.languageService.delete(id).subscribe(
        data => {
          console.log(data);
          this.tostr.success("Langue supprimee avec succes","Suppression");
          this.getMyLanguages()
        },
        err => { console.log(err) }
      )
      }
  

  }

  deleteExperience(id : any){
    if ( confirm("Are you sure you want to delete ?")){
      this.experienceService.delete(id).subscribe(
        data => {
          console.log(data);
          this.getMyExperiences()
        },
        err => { console.log(err) }
      )
      }
  

  }

  
}
