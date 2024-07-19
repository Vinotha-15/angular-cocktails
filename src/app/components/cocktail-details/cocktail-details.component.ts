import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailsService } from '../../shared/service/cocktails.service';
import { Cocktails } from '../../model/cocktails';

@Component({
  selector: 'cocktail-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.scss'
})
export class CocktailDetailsComponent implements OnInit {
  cocktailList: Cocktails[] = [];
  cocktailDetails: Cocktails = {
    id: '',
    name: '',
    isAlcoholic: false,
    imageUrl: '',
    instructions: '',
    ingredients: [],
    isSelectedFavorite: false
  };

  cocktailId: string = '';

  constructor(private cocktailsService: CocktailsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params && params?.['id']) {
        this.cocktailId = params?.['id'];
        if (this.cocktailsService.cocktailCopyList.length === 0) {
          const localStorageArray: Cocktails[] = JSON.parse(localStorage.getItem('favourite-cocktail') || '{}');
          if (localStorageArray && localStorageArray.length > 0) {
            this.cocktailsService.cocktailCopyList.push(...localStorageArray);
          }
        }
        this.getCocktailDetails(this.cocktailId);
      }
    })
  }

  getCocktailDetails(cocktailId: string): void {
    this.cocktailsService.getCocktailDetail(cocktailId).subscribe((detail: Cocktails) => {
      if (detail) {
        let detailFavList: Cocktails[] = JSON.parse(localStorage.getItem('favourite-cocktail') || '{}');
        if (detailFavList && detailFavList.length > 0) {
          const detailFavListArray: Cocktails[] = detailFavList.filter(fav => fav.id === detail.id);
          detail.isSelectedFavorite = detailFavListArray[0]?.isSelectedFavorite;
          this.cocktailDetails = detail;
        }
        else {
          this.cocktailDetails = detail;
        }
      }
    })
  }

  onClickFavourite(selectedItem: Cocktails): void {
    if (selectedItem.isSelectedFavorite) {
      selectedItem.isSelectedFavorite = false;
    } else {
      selectedItem.isSelectedFavorite = true;
    }
    this.cocktailsService.highlightFavourite(selectedItem);
  }

  goBackToListPage(): void {
    this.router.navigate(['/cocktails']);
  }


}
