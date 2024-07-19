export interface Cocktails {
  id: string;
  name: string;
  isAlcoholic: boolean;
  imageUrl: string;
  instructions: string;
  ingredients: string[];
  isSelectedFavorite: boolean;
}