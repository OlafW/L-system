Woeker
=========

Woeker is a series of experiments with L-systems (Lindenmayer Systems) in p5js (Processing).
Originally developed by biologist Aristid Lindenmayer to describe the behaviour of plant cells and to model the growth of plants and trees.

Example string and ruleset:
Alphabet: FX+-[]
Axiom: X
Ruleset:
-	X -> FX
-	F -> FF-[-FF+F+F]+[+FF-F-F]

Rules for drawing:
-	F: draw line and move forward
-	X: do nothing
-	+: rotate right
-	-: rotate left
-	[: save current location (push)
-	]: move to previous location (pop)

Example output after 5 generations
![Alt text](img/woeker7.png?raw=true)
