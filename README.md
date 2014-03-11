# WIDT

A simple microblogging app inspired by [Scotch.io's todo app] (https://github.com/scotch-io/node-todo). Built using the MEAN stack, 
with help from Mongoose and Twitter Bootstrap. 
Intended for demonstration purposes. Contibutions and/or suggestions more than welcome!

## Requirements

- Node.js
- MongoDB
- Bower

## Quick Install

1. Clone this repo
2. Install node dependencies via npm:
    
    `$ npm install --production`

3. Install additional dependencies with Bower:

    `$ bower install`

4. Run the server:

    `$ node server.js`

5. View in your browser at `http://localhost:8000`

## Tests

I'm working on adding more tests. I've been trying to use jasmine to test both front-end
and back-end, since it works well with angular and it'd be great to have just one testing framework
for everything, but I'm having trouble getting it to work with mongodb. So what I think I'm going to
end up doing is using jasmine and karma for angular (front-end) testing, and mocha for back-end testing. 
I may even just switch out jasmine entirely and just go with mocha.. We'll see.

## TODO

- Tests (currently working on)
- Add animations
- Ability to sort by category, date...
- Ability to search entries
- Should be able to delete categories of created entries
- Pagination
