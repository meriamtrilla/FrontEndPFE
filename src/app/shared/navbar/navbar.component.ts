
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Notifcation } from 'src/app/models/Notification';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
constructor(private authService : AuthService , private router : Router){

}
user : User = this.authService.getCurrentUser()
  isMobileMenuOpen = false;
  isAuthenticated : boolean = false;
  role : string = ""
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  ngOnInit(){
    if (this.authService.isAuthenticated()){
      this.isAuthenticated = true;
      this.role  = this.authService.getUserRole() 
    }
    this.generateNotifications()
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/guest/login']);
  }

  notifications : any[] =  [];
  
  generateNotifications() : void {
    this.user.notifications?.map(n =>{
      if (!n.seen){
        switch (n.type) {
          case "After_Test":
            this.notifications.push({title : "Nouveau message reçu", date: 'Il y a 2 minutes' , link : ""})
            break;
          case "Accepted":
              this.notifications.push({title : "Felicitations vous etes accepte et embauche", date: 'Il y a 2 minutes' , link : "/"})
              break;
          case "Test":
            this.notifications.push({title : "Votre commande a été expédiée", date: 'Il y a 1 heure' , link : ""})
            break;
          case "Evaluation_Test":
              this.notifications.push({title : "Vous etes invite a passer un test", date: 'Il y a 1 heure' , link : "/candidate/test/"+n.content+"/exam"})
              break;
          case "On_Line_Interview":
            this.notifications.push({title : "Vous etes invitee a passer un entretient en ligne", date: 'Hier' , link : "/candidate/interview/"+n.content+"/exam"})
            break;
          default:
            break;
        }
      }
      //this.notifications.push({title : "hello" , date: 'Il y a 2 minutes' , link : ""})
    })

  }
}
