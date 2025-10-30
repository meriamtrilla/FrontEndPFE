import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-response-iamodal',
  templateUrl: './response-iamodal.component.html',
  styleUrls: ['./response-iamodal.component.scss']
})
export class ResponseIAModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = "Entretien en ligne";
  @Input() data : any = [];
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  

  closeModal() {
    this.close.emit();
  }

  confirmAction() {
    this.submit.emit(); // Emit content to parent
  }
}