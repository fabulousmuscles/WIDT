# WIDT

A simple microblogging app inspired by [Scotch.io's todo app] (https://github.com/scotch-io/node-todo). Built using the MEAN stack, 
with help from Mongoose and Twitter Bootstrap. 

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

## Dev Install

To install development dependencies, follow the quick install above, but omit the `--production` option
from step 2. You can then run `./scripts/test.sh` and `./public/scripts/test.sh` from the root directory to run the shell
scripts that'll run the tests. The script in `./scripts/test.sh` will start a node server in test mode, create a test database
with mongodb called `testdb`, then run the tests against that.

## TODO

- Add animations
- Should be able to delete categories of created entries
- Pagination
