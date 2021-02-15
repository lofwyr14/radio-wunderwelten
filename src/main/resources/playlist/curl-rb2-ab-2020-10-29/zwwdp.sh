#! /bin/bash

# vermutlich immer um 2 erhöhen

id=108

curl -o zwwdp-2-${id}.html https://www.bremenzwei.de/audios/webchannel/webchannel-zeigler-pop-${id}.html

echo \<script\> >> zwwdp-2-${id}.html
cat zwwdp.js >> zwwdp-2-${id}.html
echo \</script\> >> zwwdp-2-${id}.html
