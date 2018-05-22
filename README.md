<h1 style="text-align:center">CTFStrap</h1>

<div style="text-align:center">
	<a href="https://github.com/feross/standard">
		<img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat"/>
	</a>
	<img src="https://img.shields.io/badge/contributions-welcome-orange.svg"/>
	<a href="https://opensource.org/licenses/MIT">
		<img src="https://img.shields.io/badge/license-MIT-blue.svg"/>
	</a>
</div>

> Reduce time to make a CTF structure, Focus on your challenge.
>
> With CTFStrap, you can make your own CTF using fully-customizable features.

## Features

### Challenges

* Filter/Search
    * (Un)solved problem, Problem type, Difficulty
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
    * Chain: When a challenge has been solved, the other challenge will be opened. <br/>~~I made a diagram about it, but mendokusaiiii...~~
* Authentication System - Flag Format(Prefix)
    * Flag Type - Normal: Single Flag (Same For All)
    * Multiple: Multiple Flag (Match with Any Flag)
    * Random L33T: Different flag for each solver id (Replace Normal flag to L33T Flag, It could only be used on the web.) <br/> ex) `FLAG{TH!S_IS_FL4G}, FLAG{THI$_1S_FL@G}, ...`
* Customizable Problem Point
    * Fixed Point: Literally Whoever Whenever Same Point
    * Balanced Point: Decreasing Point depends on solver count (Same for all solver, Customizable offset)
    ```
    Point = max(InitialPoint - SolverCount * DecreasingPointPerSolver, MinPoint)
    ```
    * Graded Point: Decreasing Point depends on solver (Not Changed after solver has increased, Customizable offset)
    ```
    Point = max(InitialPoint - NthSolver * (DecreasingPointNthSolver - 1), MinPoint)
    ```