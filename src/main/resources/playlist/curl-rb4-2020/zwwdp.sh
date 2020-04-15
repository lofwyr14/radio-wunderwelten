#! /bin/bash

for i in `seq 1 300`;
do
  echo ${i}
  curl -o zwwdp-${i}.htm https://m.radiobremen.de/bremenvier/musik/playlists/zeigler104.htmlTime?id=${i}
done
