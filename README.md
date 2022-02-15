## Flicks on the Record

## Description
Flicks on the record is a movie tracking application that lets you create fun creative lists of movies that fit a category or trend.  You can check off the movies in these lists as you watch them and win badges as you complete lists.  There are some pre-populated lists as well so you can get right to watching!  The user login function keeps track of the badges each user has earned so that they can compare their movie prowess with their friends!

## User Story
```
AS A movie watcher, 
I WANT to be able to check off movies that I have watched,
SO that I can track all the movies that I have watched.

AS A movie watcher,
I WANT to be able to earn badges when I have watched all the movies on a particular list,
SO that I can compare the badges I have earned with my friends.

AS A movie watcher,
I WANT to be able to make my own lists,
SO that I can put my own creative spin on lists that I strive to complete

AS A movie watcher,
I WANT to be able to search movies by name or year, 
SO that I can easily search for movies that I have watched, to see what lists they are a part of
```

## Acceptance Criteria
```
GIVEN a url to our application,
WHEN I click "Signup" on the home page,
THEN I am presented with a signup page so that I can create a user.
WHEN I click "Submit" on the sign up page,
THEN I am automatically logged in under that new user.
WHEN I click "Login" on the home page,
THEN I am sent to a loggin page where I can log in using a created user information.
WHEN I click "Dashboard" after logging in,
THEN I am presented quick look at the lists I have completed and the badges that I have earned.
WHEN I click the button "Create a List"
THEN I am redirected to a page where I can search for a movie to add to a new list.
WHEN I watch a movie,
THEN I can search for that movie, and check it off the list.
WHEN I check off all the movies in a list,
THEN I will be redirected to a page congradulating me and showing me the badge I earned.
```
## Features
This application helps track the movies you have watched and includes the following features:
- Check off movies that you have watched and track which lists those movies are a part of.
- Create custom lists of movies, that you can try to complete by watching the movies in the list.
- Earn badges when you complete lists so that you can compete and brag to your friends.

## Technologies
This application is written in HTML, CSS, and JavaScript.  It uses bootstrap for CSS components.  It uses GraphQL for back end routing, and React to handle front end components and state.  It uses bcrypt to encrypt passwords, and the OMIDB API to grab movie data.  It takes advantage of JWT, the cache, and React Router to quickly move through screens without having to reload.

## Review
To review the refactored code, please go to the [Repository](https://github.com/nandodavila/Movie-Project).

## Deploy
To deploy this web application, please visit the following [Deployed Application](https://just-fur-pets.herokuapp.com/api/pet).

## Wireframe
To view our wireframe of the application, please visit the following [Wireframe](https://app.diagrams.net/#G1Wb9nN03YmZO5UW5iSe7vAvPSt4JDgqy1).

## Mock-Up
To review a demo of our application, JustFurPets click the following link: [Flicks on the Record Demo](https://watch.screencastify.com/v/cfX9tYCG1P5l71olIJDf).
