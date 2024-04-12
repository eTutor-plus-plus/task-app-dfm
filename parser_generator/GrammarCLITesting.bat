rem Specify the directory path you want to create
set "directory_path=%cd%\grammar_cli_testing"
set "filename=DFMGrammar"

rem Create the directory path if it doesn't exist
mkdir "%directory_path%" 2>nul

rem Check if the directory was created successfully
if exist "%directory_path%" (
    echo Directory created successfully.
) else (
    echo Failed to create directory.
)

echo "Copying Files to Test Folder"
copy "%cd%\DFMGrammar.g4" "%directory_path%"
echo "Compiling Grammar"
cd "%directory_path%"

SET CLASSPATH=.;C:\Javalib\antlr-4.13.1-complete.jar;%CLASSPATH%

antlr4 %filename%.g4
javac %filename%*.java
grun %filename% input -gui

pause