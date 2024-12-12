#!/bin/bash
# For this to work, you need to sign into https://adventofcode.com and download you cookies to a file, `cookies.txt` 
# and place in the `src` directory

## Constants
REFETCH=true
TEMPLATE_PATH="./src/problem_template.js"

# Determine up to what date to get inputs for
month=$(date +%m)
if [[ "$month" -eq "12" ]]; then
    inputdate=$(date +%d)
else
    inputdate=31
fi

echo -e "Fetching inputs from date range 12-1-2024 thru 12-$inputdate-2024"

for (( i=1; i <= $inputdate; i++)); do
    daystr=$(printf %02d $i)
    daydir="day${daystr}"
    inputfile="${daydir}/input.txt"
    inputfile_url="https://adventofcode.com/2024/day/${i}/input"

    # Create the directory and copy over the template file if it hasn't been done yet
    if [[ ! -d $daydir ]]; then
        mkdir $daydir
        cp $TEMPLATE_PATH "$daydir/${daydir}.js"
    fi

    if [[ -f $inputfile && $REFETCH == "false" ]]; then
        echo "Input for $daydir exists. Skipping"
    else
        echo "Fetching input for $daydir -- $inputfile_url"
        curl --cookie ./src/cookies.txt $inputfile_url -o $inputfile -s
        # wget $inputfile_url -o $inputfile
    fi

done