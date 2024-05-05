grammar DFMGrammar;

input: (fact | dimension | factDimensionConnection)+;

fact: 'fact' name '{' factContent '}' SEPARATOR;

factContent: ((measure | descriptive) SEPARATOR)*;

dimension: 'dimension' name '{' dimensionContent '}' SEPARATOR;

descriptive: '{descriptive}' name;

dimensionContent: hierarchy+;

//SEPARATOR is needed to separate the hierarchies - otherwise no distinction between hierarchies possible
hierarchy: level (connection level)* (SIMPLE_CONNECTION descriptive)? SEPARATOR;

level: name | ('('name')');

connection: ('(') connectionType (')') | connectionType;

connectionType: SIMPLE_CONNECTION | MULTIPLE_CONNECTION | CONVERGENCE;

factDimensionConnection: name SIMPLE_CONNECTION name SEPARATOR;

ID: DIGIT DIGIT;

name: LETTER (LETTER | DIGIT)*;

SIMPLE_CONNECTION: '-';

CONVERGENCE: '->';

MULTIPLE_CONNECTION: '=';

measure: name;

SEPARATOR: ';';

DIGIT: [0-9];
LETTER: [a-zA-Z];
WS : [ \t\r\n]+ -> skip;