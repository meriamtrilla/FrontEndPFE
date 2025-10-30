import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'year-select',
  templateUrl: './year-select.component.html',
  styleUrls: ['./year-select.component.scss']
})
export class YearSelectComponent {
  @Input() startYear = 1990; // Start year
  @Input() endYear = new Date().getFullYear(); // End year
  @Input() selectedYear: Number | null = null; // Selected year
  @Output() selectedYearChange = new EventEmitter<number>(); // Event emitter for two-way binding
  years: number[] = []; // Array of years for the dropdown

  ngOnChanges(): void {
    // Generate years array whenever startYear or endYear changes
    this.years = [];
    for (let year = this.startYear; year <= this.endYear; year++) {
      this.years.push(year);
    }
  }

  onSelectYear(event: Event): void {
    const value = parseInt((event.target as HTMLSelectElement).value, 10);
    this.selectedYear = value;
    this.selectedYearChange.emit(value); // Notify the parent about the change
  }
}
