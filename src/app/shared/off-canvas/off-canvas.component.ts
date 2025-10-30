import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-off-canvas',
  templateUrl: './off-canvas.component.html',
  styleUrls: ['./off-canvas.component.scss']
})
export class OffCanvasComponent {

 
  isCollapsed = false;
  menuItems = [
    { label: 'Dashboard', icon: 'fas fa-home' , link :'/enterprise/dashboard' },
    { label: 'Entreprise', icon: 'fas fa-hotel' , link :'/enterprise/update' },
    { label: 'Rh', icon: 'fas fa-users' , link :'/enterprise/usersRH' },
    { label: 'Candidats', icon: 'fas fa-users' , link :'/enterprise/usersCandidat' },
    { label: 'Offres', icon: 'fa fa-file-signature' , link :'/enterprise/offres' },
    { label: 'Tests', icon: 'fa fa-check-double' , link :'/enterprise/tests' },
    { label: 'Categories', icon: 'fa fa-layer-group' , link :'/enterprise/categories' }, 
  
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}


