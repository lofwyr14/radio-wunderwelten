#! /bin/bash

for i in `seq 1 119`;
do
  echo ${i}
  curl -o zwwdp-${i}.htm http://www.radiobremen.de/bremenvier/musik/playlists/zeiglerswunderbareweltdespop100.html?id=${i}
done
