# CTFStrap
~~*Will be*~~ **developed by devonnuri.**
Reduce time to make a CTF structure, Focus on your challenge.
With CTFStrap, you can make your own CTF using fully-customizable features.

## Features
### Challenges
- Filter/Search by (un)solved problem, problem type, difficulty
- Order by alphabetical, problem type, solved count, difficulty (also support ascending and descending options)
- Customizable Hint Open Type
	- By Coin: Can Open Hints by coin (with using coin system)
	- After Time: Open publicly after specific time
	- None: No hint at all. Yeah, it's no mercy.
- Customizable Challenge Open Type
	- By Coin: Can Open Hints by coin (with using coin system)
	- Normal: Just Open from the beginning
	- After Time: Open after specific time
	- Chain: When a challenge has been solved, the other challenge will be opened.
	
	~~I made a diagram about it, but mendokusaiiii...~~
- Authentication System
	- Flag Format(Prefix)
	ex) `STRAPCTF{%s}`
	- Flag Type
		- Normal: Single Flag (Same For All)
		- Multiple: Multiple Flag (Match with Any Flag)
		- Random L33T: Different flag for each solver id
	(Replace Normal flag to L33T  Flag, It could only be used on the web.)
	ex) FLAG{TH!S_IS_FL4G}, FLAG{THI$\_1S\_FL@G}
- Customizable Problem Point
	- Fixed Point: Literally Whoever Whenever Same Point
	- Balanced Point: Decreasing Point depends on solver count (Same for all solver, Customizable offset)
	*Point = max(InitialPoint - SolverCount * DecreasingPointPerSolver, MinPoint)*
	- Graded Point: Decreasing Point depends on solver (Not Changed after solver has increased, Customizable offset)
	*Point = max(InitialPoint - NthSolver * (DecreasingPointNthSolver - 1), MinPoint)*
	
