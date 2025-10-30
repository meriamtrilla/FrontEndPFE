import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.scss']
})
export class CategoriesAdminComponent {
  constructor(private offerService : CategoryService,private toaster : ToastrService){

  }
categories : Category[] = [];
getCategorys(){
  this.offerService.all().subscribe(res => {
    this.categories = res;
  })
  }
  ngOnInit(){
    this.getCategorys();
      }
      deleteCategory(id : any) {
        if (confirm('Are you sure you want to delete ?')){
          this.offerService.delete(id).subscribe(
            (res) => {
              console.log('Category deleted');
              this.getCategorys();
            },err=>{
              this.toaster.warning('Cette catégorie relie par des offres', 'Alert');
              console.log(err);
              
            })
          }
      }
}
