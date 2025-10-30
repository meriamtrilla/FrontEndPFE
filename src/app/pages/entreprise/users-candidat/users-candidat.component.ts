import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-users-candidat',
  templateUrl: './users-candidat.component.html',
  styleUrls: ['./users-candidat.component.scss']
})
export class UsersCandidatComponent {
  candidats: User[] = []; // Liste des candidats

  constructor(
    private userService: UserServiceService, 
    private authService: AuthService,
    private router: Router // Redirection si nécessaire
  ) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est un admin avant de récupérer la liste des candidats
    if (this.authService.isAdmin()) {
      this.getCandidats();
    } else {
      // Si ce n'est pas un admin, rediriger ou afficher un message
      console.log('Access denied: You are not authorized to view the candidates.');
      this.router.navigate(['/unauthorized']);
    }
  }

  // Méthode pour récupérer la liste des candidats
  getCandidats(): void {
    this.userService.getAllCandidat().subscribe(
      (users: any) => {
        this.candidats = users;
      },
      (err) => {
        if (err.status === 403) {
          console.log('Accès refusé : Vous n\'avez pas la permission de consulter la liste des candidats.');
          // Afficher un message d'erreur dans l'UI ou rediriger vers une page d'accès interdit
        } else {
          console.log('Erreur survenue:', err);
        }
      }
    );
  }
  

  // Méthode pour supprimer un candidat
  deleteUser(id: any): void {
    if (confirm('Are you sure you want to delete')) {
      this.userService.delete(id).subscribe(
        () => {
          console.log('User deleted');
          this.getCandidats(); // Réactualiser la liste après suppression
        },
        (err) => {
          console.error('Error deleting user', err);
        }
      );
    }
  }
}