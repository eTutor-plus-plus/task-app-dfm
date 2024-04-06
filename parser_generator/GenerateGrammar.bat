set "grammar_source_dir=%cd%"
set "filename=DFMGrammar"

cd ..

set "root_dir=%cd%"

set "grammar_target_dir=%root_dir%\task-app-dfm\src\generated\antlr"

cd %grammar_source_dir%

antlr4 -Dlanguage=TypeScript %filename%.g4 -o %grammar_target_dir%

pause