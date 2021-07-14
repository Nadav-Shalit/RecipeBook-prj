import { LoggingService } from './../../logging.service';
import { RecipeService } from './../recipes.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe:Recipe
  index:number;
  frmRecipe:FormGroup;
  urlRegEx:string ='(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  constructor(private recipeSrv:RecipeService,
    private route:ActivatedRoute,
    private router:Router,
    private logSrv:LoggingService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (prm:Params) => {
        this.index = +prm['value'];
        this.recipe = this.recipeSrv.fetchByIndex(this.index);
        this.initForm();
        if(this.recipe) {
          this.logSrv.printLog('RecipeEditComponent {' + this.recipe.name + '} ngOnInit:31');
        }
      });
  }
   
  private initForm(){

    let recipeName = '';   
    let recipeDesc = '';   
    let recipeImagePath = '';
    let recipeImagePreview = ''
    let recipeIngredients:FormArray = new FormArray([]);   
    if(this.recipe) {
      recipeName = this.recipe.name;
      recipeDesc = this.recipe.description;
      recipeImagePath = this.recipe.imagePath;
      recipeImagePreview = this.recipe.imagePath;
      if(this.recipe.ingredients) {
        for (const ingredient of this.recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,[Validators.required,Validators.minLength(2)]),
              'amount':new FormControl(ingredient.amount,[Validators.required,Validators.minLength(2),Validators.min(0.1),Validators.pattern(/^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)]),
            }) 
            )
        }
      }
    } 
      this.frmRecipe = new FormGroup({
          'recipeName': new FormControl(recipeName,[Validators.required, Validators.minLength(3)],),
          'recipeDesc': new FormControl(recipeDesc,[Validators.required, Validators.minLength(10),Validators.maxLength(100)]),
          'recipeImagePath': new FormControl(recipeImagePath,[Validators.required, Validators.pattern(this.urlRegEx)]),
           'recipeIngredients': recipeIngredients
      });    
    
  }
  
  onSubmit(){
    console.log('this.frmRecipe.value.recipeIngredients',this.frmRecipe.value.recipeIngredients);
    let submittedIngredients:Ingredient[] = [];
    for (const ingredient of this.frmRecipe.value.recipeIngredients) {
        submittedIngredients.push(new Ingredient(ingredient.name,ingredient.amount,this.frmRecipe.value.recipeName));
    }
    let submittedRecipe:Recipe= new Recipe(this.frmRecipe.value.recipeName,
      this.frmRecipe.value.recipeDesc,
      this.frmRecipe.value.recipeImagePath,
      submittedIngredients
      );
    
    if(this.recipe){
      this.recipeSrv.updateRecipe(this.index,submittedRecipe);
    } else {
      this.recipeSrv.addRecipe(submittedRecipe);
    }
    this.router.navigate(this.navigateBack());
  }
  onAddIng(){
    this.getFormControls('recipeIngredients').push(
       new FormGroup({
        'name':new FormControl('',[Validators.required,Validators.minLength(2)]),
        'amount':new FormControl('',[Validators.required,Validators.minLength(2),Validators.min(0.1),Validators.pattern(/^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)]),
      })
    )
  }
  onDeleteIng(idx:number){
    if(idx >-1) {
    this.getFormControls('recipeIngredients').removeAt(idx);
  } else {   
    this.getFormControls('recipeIngredients').clear();
    }
  }  
  getFormControls(path:string){
    return (<FormArray>this.frmRecipe.get(path));
  }
  getErros(controlName:string):string{
    let errorMsg = '';
    const errors = this.frmRecipe.get(controlName).errors;
    console.log('errors',errors);
    if(errors){
      if(errors['required']){
        errorMsg='This value is required!';
      } else if (errors['minlength']){
        errorMsg='This value is too short!';
      } else if (errors['pattern']){
        errorMsg='This image path is invalid!';        
      }
    }
    return errorMsg;
  }
  navigateBack(){
    return (this.recipe) ? ['/recipes',this.index] : ['../'];
  }
}
