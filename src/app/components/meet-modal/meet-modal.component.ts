import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Meeting } from 'src/app/models/meeting';

@Component({
  selector: 'app-meet-modal',
  templateUrl: './meet-modal.component.html',
  styleUrls: ['./meet-modal.component.scss']
})
export class MeetModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = "Ajouter une reunion";
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<Meeting>();

  reunion: Meeting = {
    name: '',
    date: new Date(),
    time: '',
    user_id: 0,
    offer_id: 0,
    type: 'PERSONAL'  // Default type
  } ; // Holds textarea input

  closeModal() {
    this.close.emit();
  }

  confirmAction() {
    this.submit.emit(this.reunion); // Emit content to parent
  }
}
