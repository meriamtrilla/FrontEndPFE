import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Education } from 'src/app/models/Education';
import { Experience } from 'src/app/models/Experience';
import { Intrest } from 'src/app/models/intrest';
import { Language } from 'src/app/models/language';
import { Membership } from 'src/app/models/Membership';
import { Skill } from 'src/app/models/Skill';
import { CourseService } from 'src/app/services/course.service';
import { EducationService } from 'src/app/services/education.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { IntrestService } from 'src/app/services/intrest.service';
import { LanguageService } from 'src/app/services/language.service';
import { MembershipService } from 'src/app/services/membership.service';
import { SkillService } from 'src/app/services/skill.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
 constructor(
  private userService: UserServiceService,
  private intrestService : IntrestService ,
  private membershipService : MembershipService ,
   private courseService : CourseService,
    private experienceService : ExperienceService ,
     private languageService: LanguageService,
      private skillService: SkillService,
       private educationService: EducationService,
        private route : ActivatedRoute) { }
        userId : Number = this.route.snapshot.params["id"];
  user: any;
  intrests: Intrest[] = []
  educations: Education[] = []
  skills: Skill[] = []
  languages: Language[] = []
  courses: Course[] = []
  experiences: Experience[] = []
  memberships: Membership[] = []
  ngOnInit() {
    this.userService.get(this.userId).subscribe(user=>{
      this.user = user;
      this.getMyEducations()
    this.getMySkills()
    this.getMyLanguages()
    this.getMyCourses()
    this.getMyExperiences()
    this.getMyMemberships()
    this.getMyIntrests()
    },err=>{
      console.log(err);
      
    });
    
  }
  getMyEducations() {
    this.educationService.getEducationsByUser(this.userId).subscribe(
      data => {
        console.log(data);
        this.educations = data;
      },
      err => { console.log(err) }
    )
  }
  getMySkills() {
    this.skillService.getskillsByUser(this.userId).subscribe(
      data => {
        console.log(data);
        this.skills = data;
      },
      err => { console.log(err) }
    )
  }
  getMyLanguages() {
    this.languageService.getlanguagesByUser(this.userId).subscribe(
      data => {
        console.log(data);
        this.languages = data;
      },
      err => { console.log(err) }
    )
  }

  getMyExperiences() {
    this.experienceService.getExperiencesByUser(this.userId).subscribe(
      data => {
        console.log(data);
        this.experiences = data;
      },
      err => { console.log(err) }
    )
  }

  getMyCourses() {
    this.courseService.getCoursesByUser(this.userId).subscribe(
      data => {
        console.log(data);
        this.courses = data;
      },
      err => { console.log(err) }
    )
  }

  getMyMemberships() {
    this.membershipService.getMembershipsByUser(this.userId).subscribe(
      data => {
        console.log(data);
        this.memberships = data;
      },
      err => { console.log(err) }
    )
  }

  getMyIntrests() {
    this.intrestService.getIntrestsByUser(this.userId).subscribe(
      data => {
        console.log(data);
        this.intrests = data;
      },
      err => { console.log(err) }
    )
  }

 


 

 
}

