#! /bin/bash

# "Archive"
# https://web.archive.org/web/20191105232532/https://www1.wdr.de/radio/1live/on-air/sendungen/1live-fiehe/index.html

# for id in `seq 798 798`;
for id in `seq 1006 1006`;
do
  echo ${id}
  curl -v -o fiehe-${id}.html --fail https://www1.wdr.de/radio/1live/on-air/sendungen/1live-fiehe/fiehe-${id}.html
  # alt, funktioniert aber noch: https://www1.wdr.de/radio/1live/on-air/sendungen/1live-fiehe/fiehe-${id}.html
  # neu auf geänderter 1live-Webseite: https://www1.wdr.de/radio/1live/musik/1live-fiehe/fiehe-${id}.html
  if [[ -e fiehe-${id}.html ]]; then
    echo \<script\> >> fiehe-${id}.html
    cat fiehe.js >> fiehe-${id}.html
    echo \</script\> >> fiehe-${id}.html
  fi
done

# --fail: nicht speichern bei Fehler

# Manuell aktuell
#curl -v -o fiehe-2021-xx-xx.html --fail https://www1.wdr.de/radio/1live/on-air/sendungen/1live-fiehe/index.html
