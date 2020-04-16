#! /bin/bash

date=2020-04-16

curl -o zwwdp-${date}-1.html https://www.radiobremen.de/bremenzwei/musik/titelsuche/?wrapurl=%2Fbremenzwei%2Fmusik%2Ftitelsuche%2F\&selectdate=${date}\&stunde=22\&minute=20
curl -o zwwdp-${date}-2.html https://www.radiobremen.de/bremenzwei/musik/titelsuche/?wrapurl=%2Fbremenzwei%2Fmusik%2Ftitelsuche%2F\&selectdate=${date}\&stunde=22\&minute=55
curl -o zwwdp-${date}-3.html https://www.radiobremen.de/bremenzwei/musik/titelsuche/?wrapurl=%2Fbremenzwei%2Fmusik%2Ftitelsuche%2F\&selectdate=${date}\&stunde=23\&minute=30

cat zwwdp-${date}-1.html zwwdp-${date}-2.html zwwdp-${date}-3.html > zwwdp-${date}.html
