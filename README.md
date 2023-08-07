# Phase 4 Project: Meal PLanner

## Overview

This phase 4 project is a meal planner that lets users pick meals for the upcoming week.

## User Stories

*MVP:*

[signup/login page]

- Sign up
- Log in

[logout page]

- Log out

[meal plan page]

- View my meal plan with list of meals for the week (shows most recent meal plan)
- Reset my meal calendar (remove all meals)
- Add meal to weekly calendar by clicking from list
- Remove meal from weekly calendar
- Create new meal plan week
- Delete meal plan week

[manage meals page]

- Add meal
- Edit meal (title, ingredient list, time)
- Delete meal
- Add ingredient to meal from ingredient list
- Add new ingredient
- Delete ingredient

*Stretch:*

- Navigate forward and backward in meal plans
- Get list of ingredients needed for all meals that week
- Auto generate meal plan with random set of meals

## Database structure

[dbdiagram.io](https://dbdiagram.io/d)

Table users {
  id Integer [primary key]
  username String
  passwordhash String
}

Table meal_plans {
  id Integer [primary key]
  user_id Integer
  created_at Timestamp
  updated_at Timestamp
  meals Relationship
}

Table meals{
  id Integer [primary key]
  name String
  ingredients Relationship
  cook_time_mins Integer
}

Table ingredients{
  id Integer [primary key]
  name String
  category String
}

Ref: meal_plans.user_id > users.id
Ref: meal_plans.id <> meals.id
Ref: meals.id <> ingredients.id
