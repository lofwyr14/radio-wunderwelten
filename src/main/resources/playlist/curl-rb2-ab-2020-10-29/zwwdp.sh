#! /bin/bash

id=126

curl -o zwwdp-${id}.html https://www.bremenzwei.de/sendungen/zeiglers-wunderbare-welt-des-pop-${id}.html

echo \<script\> >> zwwdp-${id}.html
cat zwwdp.js >> zwwdp-${id}.html
echo \</script\> >> zwwdp-${id}.html
