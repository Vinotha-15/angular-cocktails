import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cocktail-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cocktail-filter.component.html',
  styleUrl: './cocktail-filter.component.scss'
})
export class CocktailFilterComponent {

  searchText: string = '';
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('searchInput') searchInputEl: ElementRef;

  updateSearchText(): void {
    this.searchText = this.searchInputEl.nativeElement.value;
    this.searchTextChanged.emit(this.searchText);
  }
}
