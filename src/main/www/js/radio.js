import { html, render } from "lit-html";
class Broadcast {
    constructor(broadcast) {
        this.id = broadcast.id;
        this.title = broadcast.title;
        this.episodes = new Map();
        let previous;
        broadcast.episodes.forEach((episode) => {
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
    get episodesArray() {
        return Array.from(this.episodes.values());
    }
    // todo: Im Datenmodel besser modelieren: show vs. sender
    get show() {
        const separator = this.title.indexOf(" - ");
        if (separator > 0) {
            return this.title.substring(0, separator);
        }
        return this.title;
    }
    get station() {
        const separator = this.title.indexOf(" - ");
        if (separator > 0) {
            return this.title.substring(separator + 3);
        }
        return null;
    }
}
class Episode {
    constructor(episode) {
        this.id = episode.id;
        this.title = episode.title;
        this.date = episode.date ? new Date(Date.parse(episode.date)) : null;
        this.songs = new SongList(episode.songs);
    }
    get dateFormat() {
        if (this.date) {
            const month = this.date.getUTCMonth() + 1;
            return this.date.getUTCDate() + "." + (month > 9 ? "" : "0") + month + "." + this.date.getUTCFullYear();
        }
        else {
            return "unbekannt";
        }
    }
}
class Song {
    constructor(song) {
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
}
class SongList {
    constructor(object) {
        this.list = [];
        this.hasTime = false;
        this.hasTitle = false;
        this.hasPerformer = false;
        this.hasComposer = false;
        this.hasNumber = false;
        this.hasAlbum = false;
        this.hasGenre = false;
        this.hasYear = false;
        this.hasDuration = false;
        object === null || object === void 0 ? void 0 : object.forEach(entry => {
            entry === null || entry === void 0 ? void 0 : entry.forEach(object => {
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
        });
    }
}
class Radio extends HTMLElement {
    constructor() {
        super();
        this.PERMA_LINK = /\/(zwwdp|ta|fiehe|ptw)(-([a-z0-9]+))?\.html/;
        console.info("Radio constructor!");
    }
    connectedCallback() {
        this.renderBroadcast();
        // const template = this.test("Yeah!");
        // render(template, document.body);
    }
    get space() {
        return this.getAttribute("space");
    }
    set space(space) {
        if (space) {
            this.setAttribute("space", space);
        }
        else {
            this.removeAttribute("space");
        }
    }
    get episodeId() {
        return this.getAttribute("episodeId");
    }
    set episodeId(episodeId) {
        if (episodeId) {
            this.setAttribute("episodeId", episodeId);
        }
        else {
            this.removeAttribute("episodeId");
        }
    }
    linkLinkToggle(event) {
        this.querySelector("#link-list").classList.toggle("d-none");
    }
    html1(broadcast, episode) {
        return html `<radio-title show="${broadcast.show}" date="${episode.dateFormat}" type="Playlist" station="${broadcast.station}"></radio-title>
<nav id="link-list" class="small d-none">
${broadcast.episodesArray.map(e => html `<a href="${broadcast.id}-${e.id}.html">${e.dateFormat} (${e.songs.list.length} Titel)</a> `)}
</nav>
<div class="form-group">

${episode.previousId
            ? html `<a class="btn" href="${broadcast.id}-${episode.previousId}.html" aria-label="Zurück">Zurück</a>`
            : html `<a class="btn disabled">Zurück</a>`}
<button class="btn" id="link-list-toggle" @click="${this.linkLinkToggle.bind(this)}">Liste</button>
${episode.nextId
            ? html `<a class="btn" href="${broadcast.id}-${episode.nextId}.html" aria-label="Weiter">Weiter</a>`
            : html `<a class="btn disabled">Weiter</a>`}
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
  </tr></thead><tbody></tbody></table>`;
    }
    html2(episode, song) {
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
</tr>`;
    }
    renderBroadcast() {
        const result = window.location.pathname.match(this.PERMA_LINK);
        if (result && result.length >= 3) {
            if (result[1]) {
                this.space = result[1];
            }
            else {
                this.space = "zwwdp";
            }
            if (result[3]) {
                this.episodeId = result[3];
            }
            else {
                // todo: may inialized better
                this.episodeId = null;
            }
        }
        const location = `json/${this.space}.json`;
        window.fetch(location)
            .then(response => response.json())
            .then((json) => new Broadcast(json))
            .then(broadcast => {
            // Auswählen der Song-Tabelle für die 1. Episode
            const episode = this.episodeId ? broadcast.episodes.get(this.episodeId) : broadcast.newestEpisode;
            render(this.html1(broadcast, episode), this);
            const table = this.querySelector("tbody");
            table.innerHTML = "";
            episode.songs.list.forEach(song => {
                table.insertAdjacentHTML("beforeend", this.html2(episode, song));
            });
        });
    }
}
document.addEventListener("DOMContentLoaded", function (event) {
    window.customElements.define("radio-songs", Radio);
});
class RadioTitle extends HTMLElement {
    get show() { return this.getAttribute("show"); }
    ;
    get date() { return this.getAttribute("date"); }
    ;
    get type() { return this.getAttribute("type"); }
    ;
    get station() { return this.getAttribute("station"); }
    ;
    constructor() {
        super();
    }
    connectedCallback() {
        const title = `${this.show} vom ${this.date} auf ${this.station}`;
        const rootNode = this.getRootNode();
        rootNode.querySelector("head title").innerHTML = title;
        render(html `<h1>${title}</h1><h3>${this.type}</h3>`, this);
    }
}
document.addEventListener("DOMContentLoaded", function (event) {
    window.customElements.define("radio-title", RadioTitle);
});
