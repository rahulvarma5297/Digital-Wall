## Steps to run the project:

1. Download the zip
2. Open terminal
3. run `npm install` to install the required dependencies.
4. run `npm start` to start the project.


## Basic functionalities:
Wall -> user can create, update and delete boards.
board -> user can create, update and delete posts.

user can like posts.
user can search boards by title in the wall.
user can search posts by title in particular board.

## Bonus functionalities:
user can able to bookmark posts.
Hosted the react app.

# Wall
- wall
	  1. boards -> read, create, update and delete -> search by title
# boards
- board
    2.posts -> read, create, update and delete -> search by posts title

First divide the work into small components
# Navbar -> 
- Navbar
    1. logo 
    2. search bar
    3. reate button
# boards component -> 
- Component
    1. left side color
    2. title
    3. 3 dots -> edit and delete
# create new board component -> 
- title
    1. title
    2. color selection
    3. create button
# arranging all the components in the Wall
- board (posts)
    1. Empty posts UI
    2. search bar
    3. post component:
        - title
        - bookmark
        - edit and delete
        - date
        - description and image
        - like
    4. create new post component:
        - title
        - image
        - description
        - create button
