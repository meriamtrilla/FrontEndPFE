import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-users-rh',
  templateUrl: './users-rh.component.html',
  styleUrls: ['./users-rh.component.scss']
})
export class UsersRHComponent {
constructor(
    
    private userService : UserServiceService){}
    users : User[] = []
 getUsers(){
    this.userService.getAllRH().subscribe(
      (users : any ) => {
        this.users = users 
        //this.rhs = this.users.filter(user => user.speciality && user.speciality.includes('RH'))
      } , err => {
        console.log(err);
        

    });

  }
  rhs : User[] = []
  ngOnInit(){
  
    this.getUsers()
    
     }
  deleteUser(id : any): void {
    if (confirm('Are you sure you want to delete')){
      this.userService.delete(id).subscribe(
        () => {
          console.log('User deleted');
          
          this.getUsers();
        },
        (err) => {
          console.error('Error deleting user', err);
        }
      );
      }
    

  }
}
