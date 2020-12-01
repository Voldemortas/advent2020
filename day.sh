#!/bin/bash
BASEDIR=$(dirname "$0")
if [ $# -eq 0 ]
    then        
        files=($(find -regextype egrep -regex '.*/day_([0-9]{2}).ts$' | grep -oE '[0-9][0-9]'))
         npx ts-node $BASEDIR/src/day_$files.ts
    else
        npx ts-node $BASEDIR/src/day_$1.ts
fi