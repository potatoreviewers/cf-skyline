#!/bin/bash

SRC=client
DST=.

for file in $(find $SRC -name '*'); do
  if [ -f $file ]; then
    dest=$(dirname $(echo $file | sed "s/$SRC/$DST/"))
    echo "Moving $file to $dest"
    mkdir -p $dest
    git mv $file $dest
  fi
done

# for file in $SRC/* $SRC/**/*; do
#   if [ -f "$file" ]; then
#     echo dirname $(echo $file | sed "s/$SRC/$DST/")
#     echo "Moving $file"
#     dest=$(dirname $(echo $file | sed "s/$SRC/$DST/"))
#     mkdir -p $dest
#     echo "To $dest"
#     git mv $file $dest
#     echo 
#   # fi
# done