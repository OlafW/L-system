/*
Visual experiment with L-systems (Lindenmayer System).
Originally developed by biologist Aristid Lindenmayer to describe the behaviour of plant cells
and to model the growth of plants and trees.

Example string and ruleset:

Alphabet: FX+-[]
Axiom: [+FX][-FX]
Ruleset:
		X -> FX
		F -> FF-[-FF+F+F]+[+FF-F-F]

Rules for drawing:
    F: draw line and move forward
    X: do nothing
    +: rotate right
    -: rotate left
    [: save current location (push)
    ]: move to previous location (pop)
*/

var axiom = "[+FX][-FX]";
var ruleSet = [["F", "FF-[-FF+F+F]+[+FF-F-F]"], ["X", "FX"]];

function gen(sentence) {
    var nextSentence = "";
    var found = false;

    for (var i = 0; i < sentence.length; ++i) {
        found = false;
    	for (var j = 0; j < ruleSet.length; ++j) {
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

function display(sentence) {
    var length = 15;
    var theta = radians(15);

    // modulate angle with sinewave or perlin noise
    var modphi = random(TWO_PI);
    var modamp = radians(15);
    var strokemod = 0;

    for (var i = 0; i < sentence.length; ++i) {
        var modulation = sin(modphi) * modamp;
        // var modulation = (noise(modphi) * 2.0 - 1.0) * modamp;
        modphi += 0.0011;
        strokemod += 0.01;

    	switch(sentence[i]) {
    		case 'F':
                var r = random(100, 240);
                var thickness = pow(length/15.0, 4) * 4.0;
                stroke(r, 160, 225-r/2, 225);
                strokeWeight(noise(strokemod) * thickness);
    			line(0, 0, length, 0);
    			translate(length, 0);
                if (i % 100 == 0) length *= 0.9998;
    			break;

    		case '+':
                rotate(theta + modulation);
    			break;

    		case '-':
                rotate(-theta + modulation);
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
    createCanvas(1280, 800);
    blendMode(OVERLAY);
    background(19, 21, 25);

    var numGen = 4;
    var sentence = axiom;

    for (var n = 0; n < numGen; ++n) {
        sentence = gen(sentence);
        // console.log("generation ", n, sentence);
        // console.log();
    }

    push();
    translate(width*0.3, height*0.5);
    display(sentence);
    pop();
    push();
    translate(width*0.6, height*0.5);
    display(sentence);
    pop();
}
