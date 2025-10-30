import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-inscription-modal',
  templateUrl: './inscription-modal.component.html',
  styleUrls: ['./inscription-modal.component.scss']
})
export class InscriptionModalComponent {
@Input() isOpen: boolean = false;
  @Input() title: string = "Email d'inscription";
  // @Input() candidature: Candidature = {
  //   id: '',
  //   user_id: 0,
  //   offre_id: 0,
  //   letter: '',
  // } ;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<string>();

  code: string = ''; // Holds textarea input

  closeModal() {
    this.close.emit();
  }

  confirmAction() {
    this.submit.emit(this.code); // Emit content to parent
  }
}

