/*
L-system (Lindenmayer System)
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
*/

"use strict";

const alphabet = ["FX+-[]"];
// const axiom = "X";
// const ruleSet = [["X", "F−[[X]+X]+F[+FX]−X"], ["F", "FF"]];

const axiom = "F[++F][--F]";
const ruleSet = [["F", "FF-[-F+F+F]+[+F-F-F]"]];


function gen(sentence) {
    let nextSentence = "";

    for (let i = 0; i < sentence.length; i++) {
        let found = false;
    	for (let j = 0; j < ruleSet.length; j++) {
		    if (sentence[i] == ruleSet[j][0]) {
		        nextSentence += ruleSet[j][1];
		        found = true;
		        break;
		    }
    	}
    	if (!found) nextSentence += sentence[i];
    }
    return nextSentence;
}

function display(sentence, len, theta) {
    for (let i = 0; i < sentence.length; i++) {
    	let c = sentence[i];

    	strokeWeight(random(0.5, 9));
    	let r = random(50, 255);
		stroke(r, 160, 225-r/2, 200);

    	switch(c) {
    		case 'F':
    			line(0, 0, len, 0);
    			translate(len, 0);
    			break;
    		case '+':
    			rotate(theta);
    			break;
    		case '-':
    			rotate(-theta);
    			break;
    		case '[':
    			push();
    			break;
    		case ']':
    			pop();
    			break;
    	}
    }
}

function setup() {
	createCanvas(1280, 500);
	blendMode(OVERLAY);
	background(17, 21, 25);

	translate(-250, height/2);

	const numGen = 5;
	let sentence = axiom;
	let len = 30;
	let theta = radians(30);

    for (let i = 0; i < numGen; i++) {
        sentence = gen(sentence);

        push();
        rotate(radians(random(-5, 5)));
        display(sentence, len, theta);
        pop();

        len *= 0.9;
        theta *= 0.9;
    }
}
