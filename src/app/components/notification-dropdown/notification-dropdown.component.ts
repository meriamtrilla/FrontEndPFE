import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.scss']
})
export class NotificationDropdownComponent {
  dropdownOpen = false;
constructor(private route : Router){

}

  // Liste des notifications
  @Input() notifications : any = [];

  // Toggle du dropdown
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  goTo( n : String ){
this.route.navigate([n]);
  }
}
