class Broadcast {
    constructor(broadcast) {
        this.id = broadcast.id;
        this.name = broadcast.name;
        this.episodes = new Map();
        broadcast.episodes.forEach((episode) => {
            this.episodes.set(Number(episode.id), new Episode(episode));
        });
    }
}
class Episode {
    constructor(episode) {
        this.id = Number(episode.id);
        this.title = episode.title;
        this.date = new Date(Date.parse(episode.date));
        this.songs = [];
        episode.songs.forEach(entry => {
            entry.forEach(song => this.songs.push(new Song(song)));
        });
    }
    get dateString() {
        return this.date.getUTCDay() + "." + this.date.getUTCMonth() + "." + this.date.getUTCFullYear();
    }
}
class Song {
    constructor(song) {
        this.title = song.title;
        this.performer = song.performer;
    }
}
class Radio extends HTMLElement {
    constructor() {
        super();
        console.log("Song");
    }
    connectedCallback() {
        // this.renderSonglist();
        this.renderBroadcast();
    }
    renderSonglist() {
        this.insertAdjacentHTML("afterbegin", `<table class="table"><tbody></tbody></table>`);
        this.getSongs().then(songs => {
            const tbody = this.querySelector("table>tbody");
            songs.forEach(measuring => {
                tbody.insertAdjacentHTML("beforeend", `<tr><td>${measuring.title}</td><td>${measuring.performer}</td></tr>`);
            });
        });
    }
    renderBroadcast() {
        this.insertAdjacentHTML("afterbegin", `<div class="form-group">
<label>Songliste vom ...
<select class="form-control"><option>Datum auswählen</option></select></label></div>
<table class="table"><thead>
  <tr>
    <th>Song</th>
    <th>Interpret</th>
  </tr></thead><tbody></tbody></table>`);
        this.getBroadcast("json/zwwdp.json").then(broadcast => {
            const select = this.querySelector("select");
            select.addEventListener("change", (event) => {
                const optionalParams = event.currentTarget;
                console.log("test %o", optionalParams);
                console.log("test %o", optionalParams.value);
                const table = this.querySelector("tbody");
                table.innerHTML = "";
                const id = Number(optionalParams.value);
                if (id) {
                    const episode = broadcast.episodes.get(id);
                    episode.songs.forEach(song => {
                        table.insertAdjacentHTML("beforeend", `<tr><td>${song.title}</td><td>${song.performer}</td></tr>`);
                    });
                }
            });
            broadcast.episodes.forEach(episode => {
                select.insertAdjacentHTML("beforeend", `<option value="${episode.id}">${episode.dateString} (${episode.songs.length} Titel)</td></option>`);
            });
        });
    }
    getSongs() {
        return window.fetch("json/songs.json")
            .then(response => response.json())
            .then((json) => json.map((song) => new Song(song)));
    }
    getBroadcast(location) {
        return window.fetch(location)
            .then(response => response.json())
            .then((json) => new Broadcast(json));
    }
}
document.addEventListener("DOMContentLoaded", function (event) {
    window.customElements.define("radio-songs", Radio);
});
