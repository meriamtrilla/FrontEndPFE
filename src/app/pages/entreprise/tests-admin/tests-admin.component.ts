import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test-service.service';

@Component({
  selector: 'app-tests-admin',
  templateUrl: './tests-admin.component.html',
  styleUrls: ['./tests-admin.component.scss']
})
export class TestsAdminComponent {

   constructor(private testService : TestService,private toaster : ToastrService){
  
    }
  tests : Test[] = [];
  getTests(){
    this.testService.all().subscribe(res => {
      this.tests = res;
    })
    }
    ngOnInit(){
      this.getTests();
        }
        deleteTest(id : any) {
          if (confirm('Are you sure you want to delete?')){
            this.testService.delete(id).subscribe(
              (res) => {
                console.log('Test supprimer');
                this.getTests();
              },err=>{
                this.toaster.warning('Cet test relie par des offres', 'Alert');
            
                console.log(err);
                
              })
            }


        }
}
