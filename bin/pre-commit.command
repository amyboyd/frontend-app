#!/bin/bash
# Pre-commit Git hook.
# Runs JSHint on JavaScript files.
#
# If you absolutely must commit without testing,
# use: git commit --no-verify

filenames=($(git diff --name-only HEAD))

# JSHint.
for i in "${filenames[@]}"
do
    if [[ $i =~ \.js$ ]];
    then
        echo "A .js file has changed - running JSHint."

        bin/jshint.command
        if [ $? -ne 0 ];
        then
            exit 1
        fi

        echo "JSHint was fine"
        break
    fi
done
