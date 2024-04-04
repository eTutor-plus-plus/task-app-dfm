grammar FactGrammar ;

fact : 'Fact:' ID ';' name (measures)? '.' ;

ID: DIGIT DIGIT ;

name: LETTER+ ;

measures: '[' name ( ';' name)* ']';

DIGIT: [0-9] ;
LETTER: [a-zA-Z] ;
WS : [ \t\r\n]+ -> skip ;