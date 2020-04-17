#! /bin/bash

for i in `seq 1 613`;
do
  echo ${i}
  curl -v -o fiehe-${i}.html --fail https://www1.wdr.de/radio/1live/on-air/sendungen/1live-fiehe/fiehe-${i}.html
done

# --fail: nicht speichern bei Fehler