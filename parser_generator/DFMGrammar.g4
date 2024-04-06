grammar DFMGrammar;

fact : 'fact:' name '{' content '}';

content: (descriptives | measures)*;

descriptives: 'descriptives:' '{' (attributes)? '}';

dimensions: 'dimensions:' (name)? '{'  '}'; //TODO: Add dimensions and level nodes with connections

ID: DIGIT DIGIT;

name: LETTER (LETTER | DIGIT)*;

measures: name (',' name)*;

attributes: name (',' name)*;

DIGIT: [0-9];
LETTER: [a-zA-Z];
WS : [ \t\r\n]+ -> skip;