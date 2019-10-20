<h1 align="center">CTFStrap</h1>

<p align="center">
	<a href="https://github.com/airbnb/javascript">
		<img src="https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg?style=flat"/>
	</a>
	<img src="https://img.shields.io/badge/contributions-welcome-orange.svg"/>
	<a href="https://opensource.org/licenses/MIT">
		<img src="https://img.shields.io/badge/license-MIT-blue.svg"/>
	</a>
</p>

> Reduce time to make a CTF structure, Focus on your challenge.
>
> With CTFStrap, you can make your own CTF using fully-customizable features.

## Installation

### Download Source Code

```console
$ git clone https://github.com/devonnuri/CTFStrap.git
```

### Edit .env file

#### Frontend (/ctfstrap-frontend/.env)

```conf
# URL of backend server
REACT_APP_BACKEND_URL=http://localhost:5000
```

#### Backend (/ctfstrap-backend/.env)

```conf
# URL of frontend serer
FRONTEND_URL=http://localhost:3000
# Port of backend server
BACKEND_PORT=5000
# Type of database server
DB_TYPE=postgresql
# Hostname of database server
DB_HOST=localhost
# Name of database you will use
DB_NAME=ctfstrap
# Username of database server
DB_USERNAME=ctfstrap
# Password of database server
DB_PASSWORD=password
# Secret token key for jsonwebtoken
SECRET_TOKEN_KEY=VERY_SECRET_KEY
# Upload directory of challenge files
UPLOAD_DIR=./uploads
```

### Build & Run

> Note : Environment variables from frontend .env file will be embedded during buildtime.
> Please rebuild after changing frontend .env file

```console
$ cd ctfstrap-backend
$ npm install   # or yarn install
$ npm run build # or yarn build

$ cd ../

$ cd ctfstrap-frontend
$ npm install   # or yarn install
$ npm run build # or yarn build
```

### Run server

```console
$ node ctfstrap-backend/build/index.js

$ npm install serve -g # or yarn global add serve
$ serve -s ctfstrap-frontend/build/ -p {PORT}
```

## Features

*Most of the features are currently in process or not featured.*

### Challenges

* Filter/Search
  * (Un)Solved problem, Problem type, Difficulty
* Order
  * Alphabetical, Problem type, Solved count, Difficulty (Ascending and Descending)
* Customizable Hint Open Type
  * By Coin: Can Open Hints by coin (with using coin system)
  * After Time: Open publicly after specific time
  * None: No hint at all. Yeah, it's no mercy.
* Customizable Challenge Open Type
  * By Coin: Can Open Hints by coin (with using coin system)
  * Normal: Just Open from the beginning
  * After Time: Open after specific time
  * Chain: When a challenge has been solved, the other challenge will be opened.
* Authentication System - Flag Format(Prefix)
  * Flag Type - Normal: Single Flag (Same For All)
  * Multiple: Multiple Flag (Match with Any Flag)
  * Random L33T: Different flag for each solver id (Replace Normal flag to L33T Flag, Provide Endpoint to get Random Flag)

    ex) `FLAG{TH!S_IS_FL4G}, FLAG{THI$_1S_FL@G}, ...`
* Customizable Problem Point
  * Fixed Point: Literally Whoever Whenever Same Point
  * Balanced Point: Decreasing Point depends on solver count (Same for all solver, Customizable offset)

    ```text
    Point = max(InitialPoint - SolverCount * DecreasingPointPerSolver, MinPoint)
    ```

  * Graded Point: Decreasing Point depends on solver (Not Changed after solver has increased, Customizable offset)

    ```text
    Point = max(InitialPoint - NthSolver * (DecreasingPointNthSolver - 1), MinPoint)
    ```

## Contributing

### Hey! I found a security vuln!

* Shh... Take it easy.. **DO NOT MAKE A GITHUB ISSUE!**

  There might be a villain that abuses the vuln to make a filthy profit.

  Feel free to send me email to [devonnuri@gmail.com](mailto://devonnuri@gmail.com)

### Hmm.. I think it's not going my way!

* **Double Check whether there aren't existing Github Issues about the bug.**

* If you can't look it up, you're ready to report the bug to Github Issues.

* Make sure that your issue is fully understandable.

### Hooray! I made a patch that implements new features!

* [Make a new pull request](https://github.com/devonnuri/CTFStrap/pull/new/master)!

* Describe your code in detail.

* Ready for our collaborators to accept your PR.

### Oh.. Your Repo is great! I want to give you help consistently.

* Feel free to send me email to [devonnuri@gmail.com](mailto://devonnuri@gmail.com) for inviting you as a collaborator.

* If you send me with a brief self introduction and GitHub ID, it will be helpful for you to refer to it.
