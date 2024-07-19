import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { CocktailsService } from '../../shared/service/cocktails.service';
import { Cocktails } from '../../model/cocktails';
import { CommonModule } from '@angular/common';
import { CocktailFilterComponent } from './cocktail-filter/cocktail-filter.component';
import { Router } from '@angular/router';
import { CocktailDetailsComponent } from '../cocktail-details/cocktail-details.component';

@Component({
  selector: 'cocktail-list',
  standalone: true,
  imports: [CommonModule, CocktailFilterComponent, CocktailDetailsComponent],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss'
})
export class CocktailListComponent implements OnInit {

  cocktailList: Cocktails[] = [];
  searchText: string = '';
  favouriteCocktail: boolean = false;
  favouriteCocktailList: Cocktails[] = [];

  constructor(private cocktailsService: CocktailsService, private router: Router) { }


  ngOnInit(): void {
    if (this.cocktailsService.cocktailCopyList && this.cocktailsService.cocktailCopyList.length === 0) {
      const localStorageArray: Cocktails[] = JSON.parse(localStorage.getItem('favourite-cocktail') || '{}');
      if (localStorageArray && localStorageArray.length > 0) {
        this.cocktailsService.cocktailCopyList.push(...localStorageArray)
      }
    }
    this.getCocktailList();
  }

  getCocktailList(): void {
    this.cocktailsService.getCocktailList().subscribe((list: Cocktails[]) => {
      if (list && list.length > 0) {
        this.cocktailList = list;
      }
      if (localStorage['favourite-cocktail']) {
        let favoriteCocktailList: Cocktails[] = JSON.parse(localStorage.getItem('favourite-cocktail') || '{}');
        this.cocktailList.forEach(resList => {
          favoriteCocktailList.forEach((localList) => {
            if (resList.id === localList.id) {
              resList.isSelectedFavorite = localList.isSelectedFavorite;
            }
          })
        });
      }
    })

  }

  setSearchText(value: string): void {
    this.searchText = value;
  }

  onClickFavourite(selectedItem: Cocktails): void {
    const data = this.cocktailList.filter(list => list.id === selectedItem.id);
    if (data[0].isSelectedFavorite) {
      data[0].isSelectedFavorite = false;
    } else {
      data[0].isSelectedFavorite = true;
    }
    this.cocktailsService.highlightFavourite(selectedItem);
  }

  cocktailDetails(id: string): void {
    this.cocktailsService.selectedCocktailId = id;
    this.router.navigate(['/cocktails', id]);
  }

}
