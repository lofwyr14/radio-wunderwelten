#!/bin/bash

RTFS=$(find . -name "*.rtf")

for RTF in ${RTFS}; do
  textutil -format rtf -convert html ${RTF}
done

HTMLS=$(find . -name "*.html")

for HTML in ${HTMLS}; do
  DATE=${HTML//\.\//}
  DATE=${DATE//\.html/}
  echo \<script\> >> ${HTML}
  echo "let file=\"${HTML}\";" >> ${HTML}
  echo "let date=\"${DATE}\";" >> ${HTML}
  echo "let id=\"${ID}\";" >> ${HTML}
  cat zwwdp.js >> ${HTML}
  echo \</script\> >> ${HTML}
done
