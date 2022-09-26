import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe-list/recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged=new Subject<Recipe[]>();

  // private recipes:Recipe[]=[
  //   new Recipe('Test recipe',
  //   'Recipe 1',
  //   'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
  //   [
  //     new Ingredient('Meat',3),
  //     new Ingredient('Buns',2)
  //   ]),
  //   new Recipe('Another Test recipe',
  //   'Recipe 2',
  //   'https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg',
  //   [
  //     new Ingredient('Meat',1),
  //     new Ingredient('French Fries',20)
  //   ])
  // ];
  private recipes:Recipe[]=[];
  constructor(private slService: ShoppingListService){}

  setRecipes(recipes:Recipe[]){
    this.recipes=recipes;
    this.recipesChanged.next(this.recipes.slice());

  }

  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(index:number){
    return this.recipes[index];

  }
  addIngredients(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
