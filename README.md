# Leaveit!

Leaveit! is a single-page calorie tracker app for dogs, inspired by [Loseit!](https://www.loseit.com/). It mimicks some of Loseit!'s functionalities, such as creating food, adding food to a a pet's daily calorie tracker, and logging their daily weight.

## Live site

https://leaveit.herokuapp.com/

## Technologies used

- ### Frontend
  - HTML, CSS, Javascript, React, Redux
- ### Backend
  - Flask, SQLAlchemy, Python, PostgreSQL

## Screenshots

### Home page

### Home page

### Home page

## Features

Users are able to create pets by inputing the appropriate goals and weights for their pets, then add one of the created food items onto their daily meal tracker. If users are not able to find certain food items, they are also able to create it in our database then add to their daily meal tracker. The meal tracker refreshes daily, and will show the daily caloric requirement, actual caloric intake, and how many more calories are needed.

## Challenges

- Application Design

  - As calorie tracking for dogs is not very popular, there are not too many similar websites that do similar functions. [Loseit!](https://leaveit.herokuapp.com/) has similar functions, but it is also slightly different since most calorie tracker apps out there only track the statistics for the logged in user. Leaveit! will have to be able to track and display multiple calorie trackers for each logged in users. Therefore, coming up with an elegant way to display the statistics was a little challenging, and it is also something that I am constantly still looking to improve. 
  - Due to nature of calorie tracking for dogs, their needs are calculated differently from human calorie tracking. For dogs, their daily calorie requirements depend on their size, their breed, their activity level, their age, and whether they are fixed. I had originally planned to have the user input the age of their pets when creating them. That had proved to be difficult because we would have to account for their age, but also whether they are neutered, etc. 

- Working with Redux Store
  - Leaveit! is the third project where I am using Redux, so I am getting a little more comfortable with the data flow and the reason why we use it. However, working with React/Redux always seems to be a little challenging due to the convoluted nature of the data flow. Also, the `useSelector` hook seems to run at random times, instead of consistently in the same order. Therefore, most of the times I work with the Redux store state from the frontend of the app, I needed to conditionally render elements on the screen to prevent the app from randomly crashing in case `useSelector` did not run to get the data I need before React attempts to render said data. 
- Displaying Calorie Counts
  - Displaying calorie counts was difficult since it was not stored in the database. I had to do some additional calculations in the frontend to get the actual calorie intake.
```JS
  let goal_calories, current_calories;
  if (currentPet && currentPetMeals && foods) {
    goal_calories = Math.floor(currentPet.goal_calories);
    current_calories = currentPetMeals.reduce(
      (sum, meal) => (sum += foods[meal.food_id]?.calories),
      0
    );
  }
```