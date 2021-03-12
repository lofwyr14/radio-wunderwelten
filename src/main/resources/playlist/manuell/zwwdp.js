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
        if (s.time) {
            s.time = s.time.replace(/20.*/, "20:04");
            s.time = s.time.replace(/21.*/, "21:04");
            s.time = s.time.replace(/22.*/, "22:04");
            s.time = s.time.replace(/23.*/, "23:04");
        }
        if (s.time && s.time.trim().toUpperCase() === "ZEIT") {
          // drop
        } else {
            if (s.time) {
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

document.querySelector("table").insertAdjacentHTML("beforebegin", result);
