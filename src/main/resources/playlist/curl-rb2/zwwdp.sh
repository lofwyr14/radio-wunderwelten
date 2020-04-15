#! /bin/bash

date=2020-04-16

curl -o zwwdp-${date}-1.html https://www.radiobremen.de/bremenzwei/musik/titelsuche/?wrapurl=%2Fbremenzwei%2Fmusik%2Ftitelsuche%2F\&selectdate=${date}\&stunde=22\&minute=15
curl -o zwwdp-${date}-2.html https://www.radiobremen.de/bremenzwei/musik/titelsuche/?wrapurl=%2Fbremenzwei%2Fmusik%2Ftitelsuche%2F\&selectdate=${date}\&stunde=22\&minute=45
curl -o zwwdp-${date}-3.html https://www.radiobremen.de/bremenzwei/musik/titelsuche/?wrapurl=%2Fbremenzwei%2Fmusik%2Ftitelsuche%2F\&selectdate=${date}\&stunde=23\&minute=15
curl -o zwwdp-${date}-4.html https://www.radiobremen.de/bremenzwei/musik/titelsuche/?wrapurl=%2Fbremenzwei%2Fmusik%2Ftitelsuche%2F\&selectdate=${date}\&stunde=23\&minute=45
