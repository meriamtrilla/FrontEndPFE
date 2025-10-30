import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/Email.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private toast : ToastrService,private emailService : EmailService,
    private authService: AuthService, private router: Router) {}
data : any ;
 code : String = ''
  role : Number= 1;
  register(form : NgForm){
    this.data = form.value;
    
    this.generateSixDigitCode();
this.emailService.send({
  to : form.controls["username"].value,
  code : this.code
}).subscribe(data => {console.log(data)}, err =>{});

    console.log("code",this.code);
    this.openModal();
  
     
    }
    generateSixDigitCode() {
      const min = 100000; // Valeur minimale (6 chiffres)
      const max = 999999; // Valeur maximale (6 chiffres)
      let c = Math.floor(Math.random() * (max - min + 1)) + min;
      this.code = c.toString();
  }


  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit(content: string) {
   // console.log('Submitted Motivation Letter:', content);
    //alert('Your motivation letter:\n\n' + content);
  console.log("content: ", content);
  if (content === this.code){
      this.authService.register({...this.data , role : this.role}).subscribe(
              (response) => {
                // Assuming response contains user data and JWT token
                //this.authService.setUser(response);
                console.log(response);
                this.toast.success("Inscription avec success");
                this.router.navigate(['/guest/login']); // Redirect to home after login
              },
              (error) => {
                console.error('Register failed', error);
                this.toast.error("Erreur lors de l'inscription");
              }
            );
  }else{
    this.toast.error("Code d'inscription invalide");
  }
  
 
    this.closeModal();
  }
  } 

