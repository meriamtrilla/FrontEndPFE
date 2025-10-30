import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Candidature } from 'src/app/models/candidature';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Modal Title';
  selectedFile!: File ;
  // For image preview
 

  onFileSelected(event: any) {
    this.motivationContent.selectedFile = event.target.files[0];
    
  }
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<string>();

  motivationContent: any = {
    content: '', // Motivation letter content
    selectedFile : ''
  }; // Holds textarea input

  closeModal() {
    this.close.emit();
  }

  confirmAction() {
    this.submit.emit(this.motivationContent); // Emit content to parent
  }
}
