import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from './recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes!:Recipe[];
  subscription!:Subscription;
  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe);
  // }

  constructor(private recipeService: RecipeService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged
    .subscribe(
      (recipes: Recipe[]) =>{
        this.recipes=recipes;

      }
    );
    this.recipes=this.recipeService.getRecipes();
  }
  onNewRecipe(){
this.router.navigate(['new'],{relativeTo:this.route});
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
