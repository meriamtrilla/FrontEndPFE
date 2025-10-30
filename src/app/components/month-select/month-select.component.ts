import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'month-select',
  templateUrl: './month-select.component.html',
  styleUrls: ['./month-select.component.scss']
})
export class MonthSelectComponent {
  @Input() selectedMonth : String = ''; // Selected month
  @Output() selectedMonthChange = new EventEmitter<String>(); // Event emitter to sync with parent

  onSelectMonth(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedMonth = value;
    this.selectedMonthChange.emit(value); // Notify the parent about the change
  }
  selectedLanguage: 'en' | 'fr' = 'fr'; // Default language
  months = {
    en: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    fr: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
    ],
  };

  get displayedMonths() {
    return this.months[this.selectedLanguage];
  }
}
