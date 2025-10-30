import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cv-upload',
  templateUrl: './cv-upload.component.html',
  styleUrls: ['./cv-upload.component.scss']
})
export class CvUploadComponent {

  public cvFile: File | null = null;
  public cvData: any = {}; // Les données extraites du CV

  constructor(private http: HttpClient) {}

  // Méthode appelée lorsque le fichier est sélectionné
  onFileSelected(event: any): void {
    this.cvFile = event.target.files[0];
  }

  // Méthode pour uploader le CV et afficher les données extraites
  uploadCv(): void {
    if (this.cvFile) {
      const formData = new FormData();
      formData.append('cv', this.cvFile);

      // Envoi du fichier au backend Flask pour extraire les données
      this.http.post('http://127.0.0.1:5000/upload_cv', formData).subscribe(
        (response: any) => {
          // Remplir le formulaire avec les données extraites
          this.cvData = response;
        },
        (error: any) => {
          console.error('Error uploading CV:', error);
        }
      );
    }
  }

  // Méthode pour enregistrer les données extraites
  saveData(): void {
    // Appeler une API pour enregistrer les données dans la base de données
    console.log('Data to save:', this.cvData);
    // Exemple d'appel API pour sauvegarder les données dans le backend
  }
}
