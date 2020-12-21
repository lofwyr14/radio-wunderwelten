import {html, render} from "lit-html";

class Broadcast {

  /** episode id */
  id: string;

  /** title */
  title: string;

  /**
   * map: episode id -> episode
   */
  episodes: Map<string, Episode>;

  /**
   * map: year -> list of episodes
   * - year as string e.g. "2000", or "unknown"
   * - list of all episodes of this year
   */
  years: Map<string, Episode[]>;

  /** the latest episode */
  latestEpisode: Episode;

  constructor(broadcast: any) {
    this.id = broadcast.id;
    this.title = broadcast.title;
    this.episodes = new Map();
    this.years = new Map();
    let previous;
    broadcast.episodes.forEach((episode: any) => {
      const e = new Episode(episode);
      this.episodes.set(episode.id, e);
      if (e.songs.list.length > 0) { // newest with songs
        this.latestEpisode = e;
      }
      if (previous) {
        previous.nextId = e.id;
        e.previousId = previous.id;
      }
      previous = e;

      const year = e.date ? e.date.getFullYear().toString() : "unknown";
      let list = this.years.get(year);
      if (list) {
        list.push(e);
      } else {
        list = [e];
        this.years.set(year, list);
      }
    });
  }

  get episodesArray(): Episode[] {
    return Array.from(this.episodes.values());
  }

  get yearsArray(): string[] {
    return Array.from(this.years.keys());
  }

  // todo: Im Datenmodel besser modelieren: show vs. sender
  get show(): string {
    const separator = this.title.indexOf(" - ");
    if (separator > 0) {
      return this.title.substring(0, separator);
    }
    return this.title;
  }

  get station():string {
    const separator = this.title.indexOf(" - ");
    if (separator > 0) {
      return this.title.substring(separator + 3);
    }
    return null;
  }
}

class Episode {
  id: string;
  title: string;
  date: Date;
  comment: string;
  songs: SongList;
  nextId: string;
  previousId: string;

  constructor(episode: any) {
    this.id = episode.id;
    this.title = episode.title;
    this.date = episode.date ? new Date(Date.parse(episode.date)) : null;
    this.comment = episode.comment;
    this.songs = new SongList(episode.songs);
  }

  get dateFormat(): string {
    if (this.date) {
      const month = this.date.getUTCMonth() + 1;
      return this.date.getUTCDate() + "." + (month > 9 ? "" : "0") + month + "." + this.date.getUTCFullYear();
    } else {
      return "unbekannt";
    }
  }
}

class Song {

  time: string;
  title: string;
  performer: string;
  composer: string;
  number: string;
  album: string;
  genre: string;
  year: string;
  duration: string;

  constructor(song: any) {
    this.time = song.time;
    this.title = song.title;
    this.performer = song.performer;
    this.composer = song.composer;
    this.number = song.number;
    this.album = song.album;
    this.genre = song.genre;
    this.year = song.year;
    this.duration = song.duration;
  }

  get amazon(): string {
    const search = (this.performer ? this.performer : "")
        + " " + (this.album ? this.album : "")
        + " " + (this.title ? this.title : "");
    return window.encodeURI(
        `https://www.amazon.de/s/ref=nb_sb_noss?field-keywords=${search}&tag=popecke-21`);
  }

  get spotify(): boolean {
    return this.title === "Airport"
    && this.performer === "The Motors";
  }

  get spotifyWeb(): string {
    if (this.title === "Airport"
    && this.performer === "The Motors") {
    return window.encodeURI(
        `https://open.spotify.com/track/6F0CQMioZrqgkp3oHx4hpY`);
    } else {
      return null;
    }
  }

  get spotifyApp(): string {
    if (this.title === "Airport"
    && this.performer === "The Motors") {
    return window.encodeURI(
        `spotify:track:6F0CQMioZrqgkp3oHx4hpY`);
    } else {
      return null;
    }
  }
}

class SongList {

  list: Song[] = [];
  hasTime: boolean = false;
  hasTitle: boolean = false;
  hasPerformer: boolean = false;
  hasComposer: boolean = false;
  hasNumber: boolean = false;
  hasAlbum: boolean = false;
  hasGenre: boolean = false;
  hasYear: boolean = false;
  hasDuration: boolean = false;

  constructor(object) {
    object?.forEach(entry => {
      entry?.forEach(object => {
        const song = new Song(object);
        this.list.push(song);
        if (song.title) {
          this.hasTitle = true;
        }
        if (song.performer) {
          this.hasPerformer = true;
        }
        if (song.composer) {
          this.hasComposer = true;
        }
        if (song.number) {
          this.hasNumber = true;
        }
        if (song.album) {
          this.hasAlbum = true;
        }
        if (song.genre) {
          this.hasGenre = true;
        }
        if (song.year) {
          this.hasYear = true;
        }
        if (song.time) {
          this.hasTime = true;
        }
        if (song.duration) {
          this.hasDuration = true;
        }
      });
    })
  }
}

class Radio extends HTMLElement {

  private readonly PERMA_LINK = /\/(zwwdp|ta|fiehe|ptw)(-([a-z0-9]+))?\.html/;

  constructor() {
    super();
    console.info("Radio constructor!");
  }

  connectedCallback() {
    this.renderBroadcast();

    // const template = this.test("Yeah!");
    // render(template, document.body);
  }

  get space(): string {
    return this.getAttribute("space");
  }

  set space(space: string) {
    if (space) {
      this.setAttribute("space", space);
    } else {
      this.removeAttribute("space");
    }
  }

  get episodeId(): string {
    return this.getAttribute("episodeId");
  }

  set episodeId(episodeId: string) {
    if (episodeId) {
      this.setAttribute("episodeId", episodeId);
    } else {
      this.removeAttribute("episodeId");
    }
  }

  private html1(broadcast: Broadcast, episode: Episode) {

    return html`
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
${episode.previousId
        ? html`<a class="nav-link" href="${broadcast.id}-${episode.previousId}.html" aria-label="Zurück"><i class="fa fa-arrow-left"></i> Zurück</a>`
        : html`<a class="nav-link disabled"><i class="fa fa-arrow-left"></i> Zurück</a>`
    }
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#yearDropdown" aria-controls="yearDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="yearDropdown">
      <ul class="navbar-nav">
${broadcast.yearsArray.map((year) => html`
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="yearDropdownMenuLink-${year}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${year}
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="yearDropdownMenuLink-${year}">
${broadcast.years.get(year).map(e =>
        html`<li><a class="dropdown-item" href="${broadcast.id}-${e.id}.html">${e.dateFormat} (${e.songs.list.length} Titel)</a></li> `
    )}
          </ul>
        </li>
`)}
      </ul>
    </div>
${episode.nextId
        ? html`<a class="nav-link" href="${broadcast.id}-${episode.nextId}.html" aria-label="Weiter"><i class="fa fa-arrow-right"></i> Weiter</a>`
        : html`<a class="nav-link disabled"><i class="fa fa-arrow-right"></i> Weiter</a>`
    }
  </div>
</nav>
<radio-title show="${broadcast.show}" date="${episode.dateFormat}" station="${broadcast.station}"></radio-title>
<h5>${episode.comment}</h5>
<h3>Playlist</h3>

<table class="table table-striped">
<colgroup>
<col/>
<col/>
<col/>
<col/>
<col/>
<col/>
<col/>
<col/>
<col/>
</colgroup>
<thead class="thead-dark">
  <tr>
    <th class="${episode.songs.hasTime ? '' : 'd-none'}">Uhr</th>
    <th class="${episode.songs.hasTitle ? '' : 'd-none'}">Titel</th>
    <th class="${episode.songs.hasPerformer ? '' : 'd-none'}">Interpret</th>
    <th class="${episode.songs.hasComposer ? '' : 'd-none'}">Komponist</th>
    <th class="${episode.songs.hasNumber ? '' : 'd-none'}">Nummer</th>
    <th class="${episode.songs.hasAlbum ? '' : 'd-none'}">Album</th>
    <th class="${episode.songs.hasGenre ? '' : 'd-none'}">Genre</th>
    <th class="${episode.songs.hasYear ? '' : 'd-none'}">Jahr</th>
    <th class="${episode.songs.hasDuration ? '' : 'd-none'}">Dauer</th>
    <th class="${episode.songs.hasTitle || episode.songs.hasPerformer ? '' : 'd-none'}">Links</th>
  </tr></thead><tbody></tbody></table>`;
  }

  private html2(episode: Episode, song: Song) {
    return `<tr>
<td class="${episode.songs.hasTime ? '' : 'd-none'}">${song.time ? song.time : ""}</td>
<td class="${episode.songs.hasTitle ? '' : 'd-none'}">${song.title ? song.title : ""}</td>
<td class="${episode.songs.hasPerformer ? '' : 'd-none'}">${song.performer ? song.performer : ""}</td>
<td class="${episode.songs.hasComposer ? '' : 'd-none'}">${song.composer ? song.composer : ""}</td>
<td class="${episode.songs.hasNumber ? '' : 'd-none'}">${song.number ? song.number : ""}</td>
<td class="${episode.songs.hasAlbum ? '' : 'd-none'}">${song.album ? song.album : ""}</td>
<td class="${episode.songs.hasGenre ? '' : 'd-none'}">${song.genre ? song.genre : ""}</td>
<td class="${episode.songs.hasYear ? '' : 'd-none'}">${song.year ? song.year : ""}</td>
<td class="${episode.songs.hasDuration ? '' : 'd-none'}">${song.duration ? song.duration : ""}</td>
<td class="${episode.songs.hasTitle || episode.songs.hasPerformer ? '' : 'd-none'}">
  <a href="${song.amazon}"><i class="fa fa-amazon" title="Suche bei Amazon"></i></a>
  <a class="${song.spotify ? '' : 'd-none'}" href="${song.spotifyWeb}" title="Spotify Web"><i class="fa fa-spotify"></i></a>
  <a class="${song.spotify ? '' : 'd-none'}" href="${song.spotifyApp}" title="Spotify App"><i class="fa fa-spotify"></i></a>
</td>
</tr>`;
  }

  private renderBroadcast() {
    const result = window.location.pathname.match(this.PERMA_LINK);
    if (result && result.length >= 3) {
      if (result[1]) {
        this.space = result[1];
      } else {
        this.space = "zwwdp";
      }
      if (result[3]) {
        this.episodeId = result[3];
      } else {
        // todo: may inialized better
        this.episodeId = null;
      }
    }

    const location = `json/${this.space}.json`;
    window.fetch(location)
        .then(response => response.json())
        .then((json: any) => new Broadcast(json))
        .then(broadcast => {

          // Auswählen der Song-Tabelle für die 1. Episode
          const episode = this.episodeId ? broadcast.episodes.get(this.episodeId) : broadcast.latestEpisode;

          render(this.html1(broadcast, episode), this);

          const table = this.querySelector("tbody");
          table.innerHTML = "";
          episode.songs.list.forEach(song => {
            table.insertAdjacentHTML("beforeend",
                this.html2(episode, song));
          });
        });
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  window.customElements.define("radio-songs", Radio);
});

class RadioTitle extends HTMLElement {

 get show(): string{return this.getAttribute("show")};
 get date(): string{return this.getAttribute("date")};
 // get type(): string{return this.getAttribute("type")};
 get station(): string{return this.getAttribute("station")};

  constructor() {
    super();
  }

  connectedCallback() {
    const title = `${this.show} vom ${this.date} auf ${this.station}`;
    const rootNode = this.getRootNode() as ShadowRoot | Document;
    rootNode.querySelector("head title").innerHTML = title;
    render(html`<h2>${title}</h2>`, this);
  }

}

document.addEventListener("DOMContentLoaded", function (event) {
  window.customElements.define("radio-title", RadioTitle);
});
