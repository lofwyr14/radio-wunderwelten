#Beschreiben des JSON Format 

TODO: Kann man hierfür Open API benutzen?

## Broadcast (Sendung)
Beschreibt die jeweilige Sendung.
Immer eine Datei pro Sendung.

| Name | Typ | Optional | Beschreibung |
|---|---|---|---|
| id | string |  | ID welche auch in URLs verwendet wird. Z.B. "zwwdp". Kommt auch in dem Dateinamen vor: zwwdp.json |
| title | string | | Titel |
| station | string | | Sender |
| groups | Group[] |  | Liste der Gruppen. Dies ist eine Strukturierungshilfe, zu Not einfach nur einen Eintrag anlegen. |

## Group (Gruppe) 

| Name | Typ | Optional | Beschreibung |
|---|---|---|---|
| id | string |  | ID (z.B. Jahr oder bei PTW die Geschichte |
| title | string | ja | Titel (Default aus Broadcast) |
| station | string | ja | Sender (Default aus Broadcast) |
| episodes | Episode[] |  | Liste der Episoden |

## Episode

| Name | Typ | Optional | Beschreibung |
|---|---|---|---|
| todo | string |

## Song

| Name | Typ | Optional | Beschreibung |
|---|---|---|---|
| todo | string |