import { Injectable } from '@angular/core';
import { APIURL } from '../apiconfig';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IAModelService {
  private apiUrl = "http://127.0.0.1:5000/"; // Update with your backend URL
 
 

  constructor(private http: HttpClient, private router: Router) {}

  // get all interviews 
  evaluate_answer(answer : string , keywords : string[]): Observable<any> {
    let formdata = new FormData();
    formdata.append('user_answer', answer);
    formdata.append('expected_keywords', keywords.toString());
    console.log("keywords", formdata);
   
    
    
    return this.http.post(`${this.apiUrl}evaluate_answer` , formdata);
  }

  meilleur_candidate(candidates : any , offre : any , nbcandidat : Number ): Observable<any> { 
    return this.http.post(`${this.apiUrl}meilleurecandidats` , {
        "offre": offre,
        "candidats" : candidates,
        "nbcandidat" : nbcandidat
    });
  }

  filtrageOffre(data : any ): Observable<any> { 
    return this.http.post(`${this.apiUrl}filtrage-offre` , data);
  }

  filtrageCV(candidats:any, offre:any,nbcandidat:number): Observable<any> {
    return this.http.post<any>("http://localhost:5000/meilleurecandidats",{responseType: 'text',candidats,offre,nbcandidat});
  }
 
  uploadCv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('cv', file, file.name);

    return this.http.post(`${this.apiUrl}upload_cv`, formData);
  }
}
