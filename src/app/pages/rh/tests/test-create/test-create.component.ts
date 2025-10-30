import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TestService } from 'src/app/services/test-service.service';

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.scss']
})
export class TestCreateComponent {

  constructor( private testService : TestService , private router : Router ){}
  testTypes: string[] = ['RH', 'TECHNIQUE', 'RH_TECHNIQUE'];
  addTest(form : NgForm){

    console.log(form.value);
    
      this.testService.store(form.value).subscribe(
        (response)=>{
          console.log(response);
          this.router.navigate(["/hr/tests/"+response.id+"/show"]);

        },
        (error)=>{
          console.log(error);
      
        }
      )
  }

}
