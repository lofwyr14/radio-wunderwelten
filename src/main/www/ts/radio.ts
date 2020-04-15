import {html, render, TemplateResult} from "lit-html";

class Broadcast {

  id: string;
  title: string;
  episodes: Map<string, Episode>;
  newestEpisode: Episode;

  constructor(broadcast: any) {
    this.id = broadcast.id;
    this.title = broadcast.title;
    this.episodes = new Map();
    let previous;
    broadcast.episodes.forEach((episode: any) => {
      const e = new Episode(episode);
      this.episodes.set(episode.id, e);
      if (e.songs.list.length > 0) { // newest with songs
        this.newestEpisode = e;
      }
      if (previous) {
        previous.nextId = e.id;
        e.previousId = previous.id;
      }
      previous = e;
    });
  }

  get episodesArray(): Episode[] {
    return Array.from(this.episodes.values());
  }
}

class Episode {
  id: string;
  title: string;
  date: Date;
  songs: SongList;
  nextId: string;
  previousId: string;

  constructor(episode: any) {
    this.id = episode.id;
    this.title = episode.title;
    this.date = episode.date ? new Date(Date.parse(episode.date)) : null;
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

  title: string;
  performer: string;
  composer: string;
  number: string;
  album: string;
  genre: string;
  year: string;

  constructor(song: any) {
    this.title = song.title;
    this.performer = song.performer;
    this.composer = song.composer;
    this.number = song.number;
    this.album = song.album;
    this.genre = song.genre;
    this.year = song.year;
  }
}

class SongList {

  list: Song[] = [];
  hasTitle: boolean = false;
  hasPerformer: boolean = false;
  hasComposer: boolean = false;
  hasNumber: boolean = false;
  hasAlbum: boolean = false;
  hasGenre: boolean = false;
  hasYear: boolean = false;

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
      });
    })
  }
}

class Radio extends HTMLElement {

  private readonly PERMA_LINK = /\/(zwwdp|ta|ptw)(-([a-z0-9]+))?\.html/;

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

  // private test(name: string): TemplateResult {
  //   return html`<h1>Wochenende: ${name}</h1>`
  // }

  linkLinkToggle(event: MouseEvent) {
    this.querySelector("#link-list").classList.toggle("d-none");
  }

  private content1(broadcast: Broadcast, episode: Episode) {

    return html`<h1>${broadcast.title}</h1>
<nav id="link-list" class="small d-none">
${broadcast.episodesArray.map(e =>
        html`<a href="${broadcast.id}-${e.id}.html">${e.dateFormat} (${e.songs.list.length} Titel)</a> `
    )}
</nav>
<div class="form-group">

<h3>Songliste vom ${episode.dateFormat}</h3>

${episode.previousId
        ? html`<a class="btn" href="${broadcast.id}-${episode.previousId}.html">Previous</a>`
        : html`<a class="btn disabled">Previous</a>`
    }
<button class="btn" id="link-list-toggle" @click="${this.linkLinkToggle.bind(this)}">Liste</button>
${episode.nextId
        ? html`<a class="btn" href="${broadcast.id}-${episode.nextId}.html">Next</a>`
        : html`<a class="btn disabled">Next</a>`
    }
</div>
<table class="table table-striped">
<colgroup>
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
    <th class="${episode.songs.hasTitle ? '' : 'd-none'}">Titel</th>
    <th class="${episode.songs.hasPerformer ? '' : 'd-none'}">Interpret</th>
    <th class="${episode.songs.hasComposer ? '' : 'd-none'}">Komponist</th>
    <th class="${episode.songs.hasNumber ? '' : 'd-none'}">Nummer</th>
    <th class="${episode.songs.hasAlbum ? '' : 'd-none'}">Album</th>
    <th class="${episode.songs.hasGenre ? '' : 'd-none'}">Genre</th>
    <th class="${episode.songs.hasYear ? '' : 'd-none'}">Jahr</th>
  </tr></thead><tbody></tbody></table>`;
  }

  private content2(episode: Episode, song: Song) {
    return `<tr>
<td class="${episode.songs.hasTitle ? '' : 'd-none'}">${song.title ? song.title : ""}</td>
<td class="${episode.songs.hasPerformer ? '' : 'd-none'}">${song.performer ? song.performer : ""}</td>
<td class="${episode.songs.hasComposer ? '' : 'd-none'}">${song.composer ? song.composer : ""}</td>
<td class="${episode.songs.hasNumber ? '' : 'd-none'}">${song.number ? song.number : ""}</td>
<td class="${episode.songs.hasAlbum ? '' : 'd-none'}">${song.album ? song.album : ""}</td>
<td class="${episode.songs.hasGenre ? '' : 'd-none'}">${song.genre ? song.genre : ""}</td>
<td class="${episode.songs.hasYear ? '' : 'd-none'}">${song.year ? song.year : ""}</td>
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
          const episode = this.episodeId ? broadcast.episodes.get(this.episodeId) : broadcast.newestEpisode;

          const html1 = this.content1(broadcast, episode);
          render(html1, this);

          const table = this.querySelector("tbody");
          table.innerHTML = "";
          episode.songs.list.forEach(song => {
            table.insertAdjacentHTML("beforeend",
                this.content2(episode, song));
          });
        });
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  window.customElements.define("radio-songs", Radio);
});
