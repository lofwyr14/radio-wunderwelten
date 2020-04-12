(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  // import {html, render, TemplateResult} from "lit-html";
  class Broadcast {
      constructor(broadcast) {
          this.id = broadcast.id;
          this.name = broadcast.name;
          this.episodes = new Map();
          broadcast.episodes.forEach((episode) => {
              const e = new Episode(episode);
              this.episodes.set(episode.id, e);
              if (e.songs.list.length > 0) { // newest with songs
                  this.newestEpisode = e;
              }
          });
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
      constructor(object) {
          this.list = [];
          this.hasTitle = false;
          this.hasPerformer = false;
          this.hasComposer = false;
          this.hasNumber = false;
          this.hasAlbum = false;
          this.hasGenre = false;
          this.hasYear = false;
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
              });
          });
      }
  }
  class Radio extends HTMLElement {
      constructor() {
          super();
          this.PERMA_LINK = /\/(zwwdp|ta|ptw)(-([a-z0-9]+))?\.html/;
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
          this.setAttribute("space", space);
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
      // private test(name: string): TemplateResult {
      //   return html`<h1>Wochenende: ${name}</h1>`
      // }
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
          this.insertAdjacentHTML("afterbegin", `<div class="form-group">
<label>Songliste vom ...
<select class="form-control"></select></label></div>`);
          // const location = "json/ta.json";
          const location = `json/${this.space}.json`;
          this.getBroadcast(location).then(broadcast => {
              const select = this.querySelector("select");
              select.addEventListener("change", (event) => {
                  const optionalParams = event.currentTarget;
                  console.log("test %o", optionalParams);
                  console.log("test %o", optionalParams.value);
                  const id = optionalParams.value;
                  const oldTable = this.querySelector("table");
                  if (oldTable) {
                      this.removeChild(oldTable); // Alte Tabelle weg, todo: besser mit LIT HTML
                  }
                  if (id) {
                      const episode = broadcast.episodes.get(id);
                      this.insertAdjacentHTML("beforeend", `<table class="table table-striped">
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
  </tr></thead><tbody></tbody></table>`);
                      const table = this.querySelector("tbody");
                      table.innerHTML = "";
                      episode.songs.list.forEach(song => {
                          table.insertAdjacentHTML("beforeend", `<tr>
<td class="${episode.songs.hasTitle ? '' : 'd-none'}">${song.title ? song.title : ""}</td>
<td class="${episode.songs.hasPerformer ? '' : 'd-none'}">${song.performer ? song.performer : ""}</td>
<td class="${episode.songs.hasComposer ? '' : 'd-none'}">${song.composer ? song.composer : ""}</td>
<td class="${episode.songs.hasNumber ? '' : 'd-none'}">${song.number ? song.number : ""}</td>
<td class="${episode.songs.hasAlbum ? '' : 'd-none'}">${song.album ? song.album : ""}</td>
<td class="${episode.songs.hasGenre ? '' : 'd-none'}">${song.genre ? song.genre : ""}</td>
<td class="${episode.songs.hasYear ? '' : 'd-none'}">${song.year ? song.year : ""}</td>
</tr>`);
                      });
                  }
              });
              broadcast.episodes.forEach(episode => {
                  select.insertAdjacentHTML("afterbegin", `<option value="${episode.id}">${episode.dateFormat} (${episode.songs.list.length} Titel)</td></option>`);
              });
              // Auswählen der Song-Tabelle für die 1. Episode
              select.value = this.episodeId ? this.episodeId : broadcast.newestEpisode.id;
              select.dispatchEvent(new Event("change"));
          });
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

})));
//# sourceMappingURL=index.js.map
