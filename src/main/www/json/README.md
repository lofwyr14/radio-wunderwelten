#Beschreiben des JSON Format 

TODO: Kann man hierfür Open API benutzen?

## Broadcast
Beschreibt die jeweilige Sendung.
Immer eine Datei pro Sendung.

| Name | Typ | Optional | Beschreibung |
|---|---|---|---|
| id | string |  | ID welche auch in URLs verwendet wird. Z.B. "zwwdp". Kommt auch in dem Dateinamen vor: zwwdp.json |
| title | string | | Titel |
| station | string | | Sender |
| groups | Group[] |  | Liste der Gruppen. Dies ist eine Strukturierungshilfe, zu Not einfach nur einen Eintrag anlegen. |

## Gruppe

| Name | Typ | Optional | Beschreibung |
|---|---|---|---|
| id | string |  | ID   welche auch in URLs verwendet wird. Z.B. "zwwdp". Kommt auch in dem Dateinamen vor: zwwdp.json |
| title | string | ja | Titel (Default aus Broadcast) |
| station | string | ja | Sender (Default aus Broadcast |
| episodes | Episode[] |  | Liste der Episoden |

## Episode
