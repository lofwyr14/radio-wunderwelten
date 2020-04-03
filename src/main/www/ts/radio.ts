class Broadcast {

  id: string;
  name: string;
  episodes: Map<string, Episode>;

  constructor(broadcast: any) {
    this.id = broadcast.id;
    this.name = broadcast.name;
    this.episodes = new Map();
    broadcast.episodes.forEach((episode: any) => {
      this.episodes.set(episode.id, new Episode(episode));
    });
  }
}

class Episode {
  id: string;
  title: string;
  date: Date;
  songs: Song[];

  constructor(episode: any) {
    this.id = episode.id;
    this.title = episode.title;
    this.date = new Date(Date.parse(episode.date));
    this.songs = [];
    episode.songs.forEach(entry => {
      entry.forEach(song => this.songs.push(new Song(song)));
    })
  }

  get dateFormat(): string {
    const month = this.date.getUTCMonth() + 1;
    return this.date.getUTCDate() + "." + (month > 9 ? "" : "0") + month + "." + this.date.getUTCFullYear();
  }
}

class Song {

  title: string;
  performer: string;

  constructor(song: any) {
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

  private renderSonglist() {
    this.insertAdjacentHTML("afterbegin", `<table class="table"><tbody></tbody></table>`);

    this.getSongs().then(
        songs => {
          const tbody = this.querySelector("table>tbody");
          songs.forEach(measuring => {
            tbody.insertAdjacentHTML("beforeend",
                `<tr><td>${measuring.title}</td><td>${measuring.performer}</td></tr>`);
          });
        }
    );
  }

  private renderBroadcast() {
    this.insertAdjacentHTML("afterbegin",
        `<div class="form-group">
<label>Songliste vom ...
<select class="form-control"></select></label></div>
<table class="table"><thead>
  <tr>
    <th>Song</th>
    <th>Interpret</th>
  </tr></thead><tbody></tbody></table>`);

    this.getBroadcast("json/zwwdp.json").then(
        broadcast => {
          const select = this.querySelector("select");
          select.addEventListener("change",
              (event) => {
                const optionalParams = event.currentTarget as HTMLSelectElement;
                console.log("test %o", optionalParams);
                console.log("test %o", optionalParams.value);

                const table = this.querySelector("tbody");
                table.innerHTML = "";

                const id = optionalParams.value;

                if (id) {
                  const episode = broadcast.episodes.get(id);

                  episode.songs.forEach(song => {
                    table.insertAdjacentHTML("beforeend",
                        `<tr><td>${song.title}</td><td>${song.performer}</td></tr>`);
                  });
                }


              });
          broadcast.episodes.forEach(episode => {
            select.insertAdjacentHTML("afterbegin",
                `<option value="${episode.id}">${episode.dateFormat} (${episode.songs.length} Titel)</td></option>`);
          });

          // Auswählen der Song-Tabelle für die 1. Episode
          select.selectedIndex = 0;
          select.dispatchEvent(new Event("change"));
        }
    );
  }

  getSongs(): Promise<Song[]> {
    return window.fetch("json/songs.json")
        .then(response => response.json())
        .then((json: any[]) => json.map((song: any) => new Song(song)))
  }

  getBroadcast(location: string): Promise<Broadcast> {
    return window.fetch(location)
        .then(response => response.json())
        .then((json: any) => new Broadcast(json))
  }

}

document.addEventListener("DOMContentLoaded", function (event) {
  window.customElements.define("radio-songs", Radio);
});
