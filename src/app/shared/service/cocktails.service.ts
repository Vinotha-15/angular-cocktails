import { Injectable } from '@angular/core';
import { Cocktails } from '../../model/cocktails';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CocktailsService {

  cocktailCopyList: Cocktails[] = [];

  constructor(private http: HttpClient) { }

  getCocktailList(): Observable<Cocktails[]> {
    return this.httpHandler<Cocktails[]>('/cockails');
  }

  getCocktailDetail(id: string): Observable<Cocktails> {
    return this.httpHandler<Cocktails>(`/cockails/${id}`);
  }

  private httpHandler<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(endpoint)
      .pipe(
        map((response: T) => response)
      )
  }

  highlightFavourite(selectedItem: Cocktails): void {
    let localFavouriteCocktailList: Cocktails[] = JSON.parse(localStorage.getItem('favourite-cocktail') || '{}');
    if (!localStorage['favourite-cocktail'] || localFavouriteCocktailList.length === 0) {
      this.cocktailCopyList.push(selectedItem);
      localStorage.setItem('favourite-cocktail', JSON.stringify(this.cocktailCopyList));
    }
    else {
      localFavouriteCocktailList = JSON.parse(localStorage.getItem('favourite-cocktail') || '{}');
      for (let i = 0; i < localFavouriteCocktailList.length; i++) {
        if (localFavouriteCocktailList.find(x => x.id === selectedItem.id) === undefined) {
          this.cocktailCopyList.push(selectedItem);
          localStorage.setItem('favourite-cocktail', JSON.stringify(this.cocktailCopyList));
          break;
        } else {
          this.cocktailCopyList.forEach((item, index) => {
            if (item.id === selectedItem.id) {
              item.isSelectedFavorite = false;
              this.cocktailCopyList.splice(index, 1);
              localStorage.setItem('favourite-cocktail', JSON.stringify(this.cocktailCopyList));
            }
          });
          break;
        }
      }
    }
  }
}
