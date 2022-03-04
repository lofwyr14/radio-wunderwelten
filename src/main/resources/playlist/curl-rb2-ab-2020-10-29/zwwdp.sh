#! /bin/bash

# vermutlich immer um 2 erhöhen
ID=252

# aktuelles Jahr
YEAR=2022
# muss jedes Jahr und beim Ausfall einer Sendung angepasst werden
IDWEEKOFFSET=117
# 4 = Donnerstags
DAYOFWEEK=4

#hack
#webchannel
#URL=https://www.bremenzwei.de/audios/webchannel/webchannel-zeigler-pop-108.html
#Sendungen
URL=https://www.bremenzwei.de/sendungen/zeiglers-wunderbare-welt-des-pop-${ID}.html

function week2date () {
  local year=$1
  local week=$2
  local dayofweek=$3
#  echo $1 $2 $3
  local weekdayof4th=`date -ujf"%Y-%m-%d" ${year}-01-04 +%u`
#  echo $weekdayof4th
  local dayofyear=$(( $dayofweek + 7 * $week - ${weekdayof4th} - 4 ))
#  echo $dayofyear
  # linux: echo  date -d "$year-01-01 +$(( $week * 7 + 1 - $(date -d "$year-01-04" +%u ) - 3 )) days -2 days + $dayofweek days" +"%Y-%m-%d"
  if [ ${dayofyear} -ge 0 ]; then
    date -v+${dayofyear}d -ujf"%Y-%m-%d" ${year}-01-01 +%Y-%m-%d
  else
    date -v${dayofyear}d -ujf"%Y-%m-%d" ${year}-01-01 +%Y-%m-%d
  fi
}

if week2date 2021 1 1 | grep -q '2021-01-04'; then echo "test ok"; else echo "test failed"; exit 1; fi
if week2date 2021 1 7 | grep -q '2021-01-10'; then echo "test ok"; else echo "test failed"; exit 1; fi
if week2date 2022 1 1 | grep -q '2022-01-03'; then echo "test ok"; else echo "test failed"; exit 1; fi
if week2date 2022 1 7 | grep -q '2022-01-09'; then echo "test ok"; else echo "test failed"; exit 1; fi
if week2date 2023 1 1 | grep -q '2023-01-02'; then echo "test ok"; else echo "test failed"; exit 1; fi
if week2date 2023 1 7 | grep -q '2023-01-08'; then echo "test ok"; else echo "test failed"; exit 1; fi
if week2date 2024 1 1 | grep -q '2024-01-01'; then echo "test ok"; else echo "test failed"; exit 1; fi
if week2date 2024 1 7 | grep -q '2024-01-07'; then echo "test ok"; else echo "test failed"; exit 1; fi
if week2date 2025 1 1 | grep -q '2024-12-30'; then echo "test ok"; else echo "test failed"; exit 1; fi
if week2date 2025 1 7 | grep -q '2025-01-05'; then echo "test ok"; else echo "test failed"; exit 1; fi
if week2date 2026 1 1 | grep -q '2025-12-29'; then echo "test ok"; else echo "test failed"; exit 1; fi
if week2date 2026 1 7 | grep -q '2026-01-04'; then echo "test ok"; else echo "test failed"; exit 1; fi
if week2date 2027 1 1 | grep -q '2027-01-04'; then echo "test ok"; else echo "test failed"; exit 1; fi
if week2date 2027 1 7 | grep -q '2027-01-10'; then echo "test ok"; else echo "test failed"; exit 1; fi

WEEK=$((${ID} / 2 - ${IDWEEKOFFSET}))
echo "Ermittlelte Kalenderwoche: $WEEK"
DATE=$(week2date ${YEAR} ${WEEK} ${DAYOFWEEK})
echo "Ermittleltes Datum:        $DATE"
HTML=zwwdp-${DATE}.html

#exit

echo "Lade URL ${URL}"
curl -o ${HTML} ${URL}

echo \<script\> >> ${HTML}
echo "let file=\"${HTML}\";" >> ${HTML}
echo "let date=\"${DATE}\";" >> ${HTML}
cat zwwdp.js >> ${HTML}
echo \</script\> >> ${HTML}

echo "Gespeicherte Datei: ${HTML}"
