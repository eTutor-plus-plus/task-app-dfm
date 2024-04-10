grammar DFMGrammar;

fact : 'fact:' name '{' content '}';

content: (descriptives | measures)*;

descriptives: 'descriptives:' '{' (attributes)? '}';

dimensions: 'dimensions:' name '{' (hierarchy)* '}';

hierarchy: level (connection level)*;

level: name | ('('name')');

connection: ('(') connection_type (')') | connection_type;

connection_type: '-' | '->' | '=';

ID: DIGIT DIGIT;

name: LETTER (LETTER | DIGIT)*;

measures: name (',' name)*;

attributes: name (',' name)*;

DIGIT: [0-9];
LETTER: [a-zA-Z];
WS : [ \t\r\n]+ -> skip;