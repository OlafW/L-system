L-system (Lindenmayer System)
=========

Originally developed by biologist Aristid Lindenmayer to describe the behaviour of plant cells 
and to model the growth of plants and trees.

Alphabet: FX+-[]
Axiom: X
Ruleset: 
		X -> F−[[X]+X]+F[+FX]−X
		F -> FF

Rules for drawing:
    F: draw line and move forward
    X: do nothing
    +: rotate right
    -: rotate left
    [: save current location (push)
    ]: move to previous location (pop)

Example output 
![alt tag](img/woeker.png)