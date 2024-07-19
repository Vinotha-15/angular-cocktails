import { Routes } from '@angular/router';
import { CocktailListComponent } from './components/cocktail-list/cocktail-list.component';
import { CocktailDetailsComponent } from './components/cocktail-details/cocktail-details.component';

export const routes: Routes = [
    { path: '', component: CocktailListComponent},
    { path: 'cocktails', component: CocktailListComponent},
    { path: 'cocktails/:id', component: CocktailDetailsComponent },
    { path: '**', component: CocktailListComponent}
];
