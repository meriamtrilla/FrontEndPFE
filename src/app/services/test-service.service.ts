import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { APIURL } from '../apiconfig';


@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = APIURL; // Update with your backend URL
 
  private testResults: { candidateId: number; testType: string; score: number; date: Date }[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  // get all tests 
  all(): Observable<any> {
    return this.http.get(`${this.apiUrl}tests/`);
  }
  withoutOffer(): Observable<any> {
    return this.http.get(`${this.apiUrl}tests/not/associated`);
  }
  // add new test
  store(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}tests/store`, payload);
  }
  update(payload: any , id : any): Observable<any> {
    return this.http.put(`${this.apiUrl}tests/update/${id}`, payload);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}tests/${id}`);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}tests/${id}`);
  }
  generateRandomScore(): number {
    return Math.floor(Math.random() * 101); // Génère un score entre 0 et 100
  }

  submitTestResult(candidateId: number, testType: string, score: number): void {
    const newTestResult = {
        candidateId,
        testType,
        score,
        date: new Date(), // Date à laquelle le test est soumis
    };

    // Vérification si un résultat existe déjà pour ce candidat et test
    const existingResultIndex = this.testResults.findIndex(
        result => result.candidateId === candidateId && result.testType === testType
    );

    if (existingResultIndex !== -1) {
        // Si un résultat existe déjà, on met à jour le score
        this.testResults[existingResultIndex] = newTestResult;
        console.log('Test result updated:', newTestResult);
    } else {
        // Sinon, on ajoute le nouveau résultat
        this.testResults.push(newTestResult);
        console.log('Test result submitted:', newTestResult);
    }
}

}