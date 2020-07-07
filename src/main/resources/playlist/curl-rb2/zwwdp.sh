#! /bin/bash

date=2020-07-02
date=2020-07-09

curl -o zwwdp-${date}-1.html https://www.radiobremen.de/bremenzwei/musik/titelsuche/?wrapurl=%2Fbremenzwei%2Fmusik%2Ftitelsuche%2F\&selectdate=${date}\&stunde=22\&minute=22
curl -o zwwdp-${date}-2.html https://www.radiobremen.de/bremenzwei/musik/titelsuche/?wrapurl=%2Fbremenzwei%2Fmusik%2Ftitelsuche%2F\&selectdate=${date}\&stunde=23\&minute=00
curl -o zwwdp-${date}-3.html https://www.radiobremen.de/bremenzwei/musik/titelsuche/?wrapurl=%2Fbremenzwei%2Fmusik%2Ftitelsuche%2F\&selectdate=${date}\&stunde=23\&minute=38

cat zwwdp-${date}-1.html zwwdp-${date}-2.html zwwdp-${date}-3.html | sed s/style\=\".*\"// > zwwdp-${date}.html
echo \<script\> >> zwwdp-${date}.html
cat zwwdp.js >> zwwdp-${date}.html
echo \</script\> >> zwwdp-${date}.html
