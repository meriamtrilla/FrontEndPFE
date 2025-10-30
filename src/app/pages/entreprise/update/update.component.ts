import { Component } from '@angular/core';
import { EnterpriseService } from '../../../services/enterprise.service';
import { Enterprise } from '../../../models/enterprise';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
constructor(
  private toast : ToastrService,
  private enterpriseService : EnterpriseService){

}
enterprise : Enterprise = {
  id : 1,
 
  name : '',
  description : '',
  phone : '',
  address : '',
  facebook : '',
  linkedin : '',
  website : '',
  email : '',
  activityField : ''
}
ngOnInit(): void{
this.enterpriseService.get("1").subscribe(
  (data : Enterprise) =>this.enterprise = data ,
   err=>console.log(err));
}
updateEnterprise(){
  this.enterpriseService.update(this.enterprise, this.enterprise.id).subscribe(
    ()=>this.toast.success("Enterprise updated"),
    err=>console.log(err)
  );
}
}
