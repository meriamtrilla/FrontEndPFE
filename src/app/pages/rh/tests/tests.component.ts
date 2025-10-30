import { Component } from '@angular/core';
import { APIURL } from 'src/app/apiconfig';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test-service.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent {

  constructor(private testService : TestService){}
  tests : Test[] = []
  getTests(){
    this.testService.all().subscribe(
      (response) => {
        console.log(response);
        this.tests = response
      },
      (error) => {
        console.error('Fetch failed', error);
      }
    );
  }
  
  
  ngOnInit(){
    this.getTests()

  }

  searchQuery : string = ''
  searchTests(){
    this.tests = this.tests.filter(test => test.title.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()))
  }

}
