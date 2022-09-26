import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe-list/recipe.model";
import { exhaustMap,map,take, tap } from "rxjs/operators/";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
@Injectable({providedIn:'root'})
export class DataStorageService{
  constructor(private http:HttpClient, private recipeService:RecipeService, private authService:AuthService){}

    storeRecipes(){
      const recipes = this.recipeService.getRecipes();
      return this.http.put('https://foode-recipe-app-default-rtdb.firebaseio.com/recipes.json',recipes)
      .subscribe(
        response =>{
          window.alert("Record Saved! Successfully");
          console.log(response);
        });
    }
    fetchRecipes(){
      return this.http
        .get<Recipe[]>('https://foode-recipe-app-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
             map(recipes =>{
               return recipes.map(recipe =>{
                  return {
                    ...recipe,
                    ingredients : recipe.ingredients ? recipe.ingredients : []
                  };
                });
              }),
              tap(recipes => {
                this.recipeService.setRecipes(recipes);
              })
            );
    }
}
