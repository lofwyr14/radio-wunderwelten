
function ISO8601_week_no(date)
{
  var dt = new Date(parseInt(date.substring(0, 4)),parseInt(date.substring(5, 7))-1,parseInt(date.substring(8, 10)));
  var tdt = new Date(dt.valueOf());
  var dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  var firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4)
  {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
  }
  return "" + (1 + Math.ceil((firstThursday - tdt) / 604800000));
}

let id=ISO8601_week_no(date);

class Song {
    time;
    title;
    performer;
}

class SongList {
    list = [];
}

class Episode {
    id;
    title;
    date;
    comment;
    songs;
}

let episode = new Episode();
episode.songs = [];
let songs;
document.querySelectorAll("tbody>tr").forEach(
    row => {
        let s = new Song();
        s.time = row.querySelector("td:nth-child(1)").textContent.trim();
        s.title = row.querySelector("td:nth-child(3)").textContent.trim();
        s.performer = row.querySelector("td:nth-child(2)").textContent.trim();
        if (!s.time) {
            s.time = undefined;
        }
        // if (s.time) {
        //     s.time = s.time.replace(/20.*/, "20:04");
        //     s.time = s.time.replace(/21.*/, "21:04");
        //     s.time = s.time.replace(/22.*/, "22:04");
        //     s.time = s.time.replace(/23.*/, "23:04");
        // }
        console.info("Song gefunden: ", s.time, s.title, s.performer);
        if (s.time && s.time.trim().toUpperCase() === "ZEIT") {
         // drop
        } else {
            if (s.time && s.time.match(".*:0[45]")) {
                songs = [];
                episode.songs.push(songs);
            }
            songs.push(s);
        }
    }
);

episode.id = id;
episode.date = date;

let result = JSON.stringify(episode);

console.info("result = ", result);

document.querySelector("table").insertAdjacentHTML("beforebegin", "<textarea id='json' style='min-width: 90%; min-height: 300px'>"+result+"</textarea>");
document.getElementById("json").select();
