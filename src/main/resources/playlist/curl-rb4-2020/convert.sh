#! /bin/bash

HTMLS=$(find . -name "zwwdp-201*-*-*.htm")

for HTML in ${HTMLS}; do
  DATE=${HTML//\.\//}
  DATE=${DATE//\.htm/}
  DATE=${DATE//zwwdp-/}
  echo \<script\> >> ${HTML}
  echo "let file=\"${HTML}\";" >> ${HTML}
  echo "let date=\"${DATE}\";" >> ${HTML}
  cat zwwdp.js >> ${HTML}
  echo \</script\> >> ${HTML}

  echo ${HTML}
done
