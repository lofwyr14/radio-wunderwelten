import {html, render} from "lit-html";

// import { Popover } from "../js/bootstrap.esm.js";

class Broadcast {

  /** episode id */
  id: string;

  /** title */
  title: string;

  /** radio station */
  station: string;

  /** moderator */
  moderator: string;

  /**
   * map: group id -> group
   */
  groups: Map<string, Group>;

  /** the latest episode with data */
  latestEpisode: Episode;

  constructor(broadcast: any) {
    this.id = broadcast.id;
    this.title = broadcast.title;
    this.station = broadcast.station;
    this.moderator = broadcast.moderator;
    this.groups = new Map();
    // this.years = new Map();
    broadcast.groups.forEach((group: any) => {

      if (this.groups.has(group.id)) {
        throw new Error(`Duplicate group id error: id='${group.id}'.`)
      }

      const g = new Group(group, this);
      this.groups.set(group.id, g);

      // const year = e.date ? e.date.getFullYear().toString() : "unknown";
      // let list = this.years.get(year);
      // if (list) {
      //   list.push(e);
      // } else {
      //   list = [e];
      //   this.years.set(year, list);
      // }
    });

    let previous: Episode;
    this.groups.forEach((group: Group) => {
      group.episodes.forEach((episode: Episode) => {
        if (previous) {
          previous.nextId = episode.group.id + "-" + episode.id;
          episode.previousId = previous.group.id + "-" + previous.id;
        }
        previous = episode;
        if (episode.songs.list.length > 0) {
          this.latestEpisode = previous;
        }
      });
    });

  }

  get groupsArray(): string[] {
    return Array.from(this.groups.keys());
  }

  get show(): string {
    return this.title;
  }
}

class Group {
  id: string;
  title: string;
  broadcast: Broadcast;
  station: string;

  /**
   * map: episode id -> episode
   */
  episodes: Map<string, Episode>;

  constructor(group: any, broadcast: Broadcast) {
    this.broadcast = broadcast;
    this.id = group.id;
    this.title = group.title;
    this.station = group.station;
    this.episodes = new Map();
    // let previous: Episode;
    group.episodes.forEach((episode: any) => {

      if (this.episodes.has(episode.id)) {
        throw new Error(`Duplicate episode id error: id='${episode.id}'.`)
      }

      const e = new Episode(episode, this);
      this.episodes.set(episode.id, e);
    });
  }

  get episodesArray(): Episode[] {
    return Array.from(this.episodes.values());
  }

  get stationDisplay():string {
    if (this.station) {
      return this.station;
    } else {
      return this.broadcast.station;
    }
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
  group: Group;

  constructor(episode: any, group: Group) {
    this.group = group;
    this.id = episode.id;
    this.title = episode.title;
    this.date = episode.date ? new Date(Date.parse(episode.date)) : null;
    this.comment = episode.comment;
    // fixme: 2 unterschiedliche Formate sollten nicht unterstützt werden.
    if (episode.parts && episode.parts[0] && episode.parts[1]) {
      this.songs = new SongList([episode.parts[0].songs,episode.parts[1].songs]);
    } else {
      this.songs = new SongList(episode.songs);
    }
  }

  get dateFormat(): string {
    if (this.date) {
      const month = this.date.getUTCMonth() + 1;
      return this.date.getUTCDate() + "." + (month > 9 ? "" : "0") + month + "." + this.date.getUTCFullYear();
    } else {
      return "unbekannt";
    }
  }

  get titleFormat():string {
    if (this.title) {
      return this.title;
    } else if (this.group.title) {
      return `${this.group.title} vom ${this.dateFormat}`;
    } else {
      return `${this.group.broadcast.title} vom ${this.dateFormat}`;
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

class RadioApplication extends HTMLElement {

  private static readonly PERMA_LINK = /\/(zwwdp|ta|fiehe|ptw)(-([a-z0-9]+))?(-([a-z0-9]+))?\.html/;

  private broadcast: Broadcast;
  private dirty: boolean = false;

  constructor() {
    super();
    console.info("Radio constructor!");
    this.addEventListener("radio.update", this.update.bind(this));
  }

  connectedCallback() {
    console.info("connectedCallback()");
    this.parseUrl();
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    console.info("attributeChangedCallback", name, oldValue, newValue);
    switch (name) {
      case "space":
        if (oldValue !== newValue) {
          this.fetchBroadcast();
//          this.fetchBroadcast2();
          this.dirty = true;
        }
        break;
      case "group-id":
        if (oldValue !== newValue) {
          this.dirty = true;
        }
        break;
      case "episode-id":
        if (oldValue !== newValue) {
          this.dirty = true;
        }
        break;
    }
    this.dispatchEvent(new CustomEvent("radio.update"));
    console.info("attributeChangedCallback END, this.space, this.episodeId, this.dirty", this.space, this.episodeId, this.dirty);
  }

  static get observedAttributes() {
    return ["space", "group-id", "episode-id"];
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

  get groupId(): string {
    return this.getAttribute("group-id");
  }

  set groupId(groupId: string) {
    if (groupId) {
      this.setAttribute("group-id", groupId);
    } else {
      this.removeAttribute("group-id");
    }
  }

  get episodeId(): string {
    return this.getAttribute("episode-id");
  }

  set episodeId(episodeId: string) {
    if (episodeId) {
      this.setAttribute("episode-id", episodeId);
    } else {
      this.removeAttribute("episode-id");
    }
  }

  /** get the current/selected episode */
  get episode() : Episode {
    return this.broadcast
        ? this.groupId
            ? this.episodeId
                ? this.broadcast.groups.get(this.groupId).episodes.get(this.episodeId)
                : this.broadcast.latestEpisode
            : this.broadcast.latestEpisode
        : null;
  }

  private html1() {
    const broadcast = this.broadcast;
    const episode = this.episode;
    console.info("html1", broadcast, episode)

    if (!broadcast || !episode) {
      return html`<h2>Lade Daten...</h2>`
    }

    return html`
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
${episode.previousId
        ? html`<a class="nav-link" href="${broadcast.id}-${episode.previousId}.html" 
@click="${this.navigate.bind(this)}" title="Zurück" aria-label="Zurück"><i class="fa fa-arrow-left"></i></a>`
        : html`<a class="nav-link disabled"><i class="fa fa-arrow-left"></i></a>`
    }
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#yearDropdown" 
        aria-controls="yearDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="yearDropdown">
      <ul class="navbar-nav">
${broadcast.groupsArray.map((groupId) => html`
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="yearDropdownMenuLink-${groupId}" role="button" 
              data-bs-toggle="dropdown" aria-expanded="false">
            ${groupId}
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="yearDropdownMenuLink-${groupId}">
${broadcast.groups.get(groupId).episodesArray.map((e: Episode) =>
        html`<li><a class="dropdown-item" href="${broadcast.id}-${e.group.id}-${e.id}.html" 
@click="${this.navigate.bind(this)}">${e.dateFormat} (${e.songs.list.length} Titel)</a></li> `
    )}
          </ul>
        </li>
`)}
      </ul>
    </div>
${episode.nextId
        ? html`<a class="nav-link" href="${broadcast.id}-${episode.nextId}.html" 
@click="${this.navigate.bind(this)}" title="Weiter" aria-label="Weiter"><i class="fa fa-arrow-right"></i></a>`
        : html`<a class="nav-link disabled"><i class="fa fa-arrow-right"></i></a>`
    }
  </div>
</nav>
<h1>${episode.titleFormat}</h1>
<h5>${episode.comment}</h5>
<h5>Datum: ${episode.dateFormat}</h5>
<h5>Sender: ${episode.group.stationDisplay}</h5>
<h5>Moderator: ${broadcast.moderator}</h5>
<h3>Playlist</h3>
<!-- XXX ausgeschlatet, da noch nicht fertig -->
<radio-popover class="d-none" data-bs-toggle="popover" title="Popover title" data-bs-content="Testing....">Playlist</radio-popover>

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

  private parseUrl() {
    const result = window.location.pathname.match(RadioApplication.PERMA_LINK);
    if (result && result.length >= 3) {
      if (result[1]) {
        this.space = result[1];
      } else {
        this.space = "zwwdp";
      }
      if (result[5]) {
        this.groupId = result[3];
        this.episodeId = result[5];
      }
    }
  }

  private fetchBroadcast() {
    const location = `json/${this.space}.json`;
    window.fetch(location)
        .then(response => response.json())
        .then((json: any) => new Broadcast(json))
        .then(broadcast => {
          this.broadcast = broadcast;
          let group = broadcast.groups.get(this.groupId);
          if (!group) {
            const groups = broadcast.groupsArray;
            this.groupId = groups[groups.length - 1];
            group = broadcast.groups.get(this.groupId);
          }
          console.warn("4", group);
          let episode = group.episodes.get(this.episodeId);
          if (!episode) {
            const episodes = group.episodesArray;
            episode = episodes[episodes.length - 1];
            this.episodeId = episode.id;
          }
          console.warn("***", location, group, episode);
          this.dirty = true;
          this.dispatchEvent(new CustomEvent("radio.update"));
        })
        .catch((reason => {
        this.insertAdjacentHTML("beforeend", `<div class="alert alert-danger">
<h3>Leider ist ein Fehler aufgetreten!</h3><div>${reason}</div>
</div>`);
    }));
  }

  private fetchBroadcast2() {
    const location = `json/ptw.json`;
    window.fetch(location)
        .then(response => response.json())
        .then(all => {

          console.log("all", all);

          let neu = {
            id: all.id,
            title: all.title,
            moderator: all.moderator,
            station: all.station,
            groups: []
          };

          const groups: any[] = all.groups;
          all.groups = [];
          groups.forEach(group => {
            console.info(group.id);

            let newEpisodes = [];
            const episodes = group.episodes;
            let index = 0;
            Object.values(episodes).forEach(episode => {

              let e : any = episode as any;

              let parts = e.parts as any[];
              parts.forEach(part => {
                if (part.songList && part.songList.songs) {
                  part.songs = part.songList.songs;
                  delete part.songList;
                }
              });

              newEpisodes.push(episode);
            });
            let newGroup = {
              id: group.id,
              title: group.title,
              station: group.station,
              moderator: group.moderator,
              hasCover: group.hasCover,
              hasMap: group.hasMap,
              songbck: group.songbck,
              episodes:newEpisodes,
            };

            neu.groups.push(newGroup);
          });


          this.insertAdjacentHTML("beforeend", `<div class="alert alert-info">
<textarea>
${JSON.stringify(neu, null, 2)}
</textarea>
</div>`);

        })
        .catch((reason => {
        this.insertAdjacentHTML("beforeend", `<h3 class="alert alert-danger">Leider ist ein Fehler mit ptw.json aufgetreten!</h3><div>${reason}</div>`);
    }));
  }

  private update(event: CustomEvent) {
    console.info("update dirty =  und episodeId = ", this.dirty, this.episodeId);
    if (this.dirty) {
      this.renderBroadcast();
      this.dirty = false;
    }
  }

  private renderBroadcast() {

    console.info("render html1");
    render(this.html1(), this);

    console.info("render html2");
    const table = this.querySelector("tbody");
    if (table) {
      table.innerHTML = "";
      const episode = this.episode;
      episode.songs.list.forEach(song => {
        table.insertAdjacentHTML("beforeend",
            this.html2(episode, song));
      });
    }

    this.syncTitle();
    console.info("render end");
  }

  private syncTitle() {
    const rootNode = this.getRootNode() as ShadowRoot | Document;
    const title = rootNode.querySelector("head title");
    const h1 = this.querySelector("h1");
    if (title && h1) {
      title.innerHTML = h1.innerText;
    }
  }

  private navigate(event: MouseEvent): void {
    // idea from https://developers.google.com/search/docs/guides/javascript-seo-basics#use-history-api
    event.preventDefault();
    const target = event.currentTarget as HTMLAnchorElement;
    const href = target.href;
    window.history.pushState({}, document.title, href) // Update URL as well as browser history.
    this.parseUrl();
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  window.customElements.define("radio-application", RadioApplication);
});

class RadioPopover extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    console.info("popover connectedCallback()");
    // @ts-ignore
    // console.info("Popover", Popover);
    // @ts-ignore
    const popover = new bootstrap.Popover(this);
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  window.customElements.define("radio-popover", RadioPopover);
});
