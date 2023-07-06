(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    var t;const i=window,s=i.trustedTypes,e=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,o="$lit$",n=`lit$${(Math.random()+"").slice(9)}$`,l="?"+n,h=`<${l}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o+s.slice(v)+n+w):s+n+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o)||i.startsWith(n)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o).split(n),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n),i=t.length-1;if(i>0){h.textContent=s?s.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n,t+1));)v.push({type:7,index:r}),t+=n.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s?s.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t=i.litHtmlVersions)&&void 0!==t?t:i.litHtmlVersions=[]).push("2.7.5");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

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
        get spotify() {
            return this.title === "Airport"
                && this.performer === "The Motors";
        }
        get spotifyWeb() {
            if (this.title === "Airport"
                && this.performer === "The Motors") {
                return window.encodeURI(`https://open.spotify.com/track/6F0CQMioZrqgkp3oHx4hpY`);
            }
            else {
                return null;
            }
        }
        get spotifyApp() {
            if (this.title === "Airport"
                && this.performer === "The Motors") {
                return window.encodeURI(`spotify:track:6F0CQMioZrqgkp3oHx4hpY`);
            }
            else {
                return null;
            }
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

    class Episode {
        constructor(episode, group) {
            this.group = group;
            this.id = episode.id;
            this.title = episode.title;
            this.date = episode.date ? new Date(Date.parse(episode.date)) : null;
            this.comment = episode.comment;
            // fixme: 2 unterschiedliche Formate sollten nicht unterstützt werden.
            if (episode.parts && episode.parts[0] && episode.parts[1]) {
                this.songs = new SongList([episode.parts[0].songs, episode.parts[1].songs]);
            }
            else {
                this.songs = new SongList(episode.songs);
            }
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
        get titleFormat() {
            if (this.title) {
                return this.title;
            }
            else if (this.group.title) {
                return `${this.group.title} vom ${this.dateFormat}`;
            }
            else {
                return `${this.group.broadcast.title} vom ${this.dateFormat}`;
            }
        }
    }

    class Broadcast {
        constructor(broadcast) {
            this.id = broadcast.id;
            this.title = broadcast.title;
            this.station = broadcast.station;
            this.moderator = broadcast.moderator;
            this.groups = new Map();
            // this.years = new Map();
            broadcast.groups.forEach((group) => {
                if (this.groups.has(group.id)) {
                    throw new Error(`Duplicate group id error: id='${group.id}'.`);
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
            let previous;
            this.groups.forEach((group) => {
                group.episodes.forEach((episode) => {
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
        get groupsArray() {
            return Array.from(this.groups.keys());
        }
        get show() {
            return this.title;
        }
    }
    class Group {
        constructor(group, broadcast) {
            this.broadcast = broadcast;
            this.id = group.id;
            this.title = group.title;
            this.station = group.station;
            this.episodes = new Map();
            // let previous: Episode;
            group.episodes.forEach((episode) => {
                if (this.episodes.has(episode.id)) {
                    throw new Error(`Duplicate episode id error: id='${episode.id}'.`);
                }
                const e = new Episode(episode, this);
                this.episodes.set(episode.id, e);
            });
        }
        get episodesArray() {
            return Array.from(this.episodes.values());
        }
        get stationDisplay() {
            if (this.station) {
                return this.station;
            }
            else {
                return this.broadcast.station;
            }
        }
    }

    class RadioApplication extends HTMLElement {
        constructor() {
            super();
            this.dirty = false;
            console.info("Radio constructor!");
            this.addEventListener("radio.update", this.update.bind(this));
        }
        connectedCallback() {
            console.info("connectedCallback()");
            this.parseUrl();
        }
        attributeChangedCallback(name, oldValue, newValue) {
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
        get groupId() {
            return this.getAttribute("group-id");
        }
        set groupId(groupId) {
            if (groupId) {
                this.setAttribute("group-id", groupId);
            }
            else {
                this.removeAttribute("group-id");
            }
        }
        get episodeId() {
            return this.getAttribute("episode-id");
        }
        set episodeId(episodeId) {
            if (episodeId) {
                this.setAttribute("episode-id", episodeId);
            }
            else {
                this.removeAttribute("episode-id");
            }
        }
        /** get the current/selected episode */
        get episode() {
            return this.broadcast
                ? this.groupId
                    ? this.episodeId
                        ? this.broadcast.groups.get(this.groupId).episodes.get(this.episodeId)
                        : this.broadcast.latestEpisode
                    : this.broadcast.latestEpisode
                : null;
        }
        htmlMain() {
            const broadcast = this.broadcast;
            const episode = this.episode;
            console.info("htmlMain", broadcast, episode);
            if (!broadcast || !episode) {
                return x `<h2>Lade Daten...</h2>`;
            }
            return x `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
${episode.previousId
            ? x `<a class="nav-link" href="${broadcast.id}-${episode.previousId}.html" 
@click="${this.navigate.bind(this)}" title="Zurück" aria-label="Zurück"><i class="fa fa-arrow-left text-primary"></i></a>`
            : x `<a class="nav-link disabled"><i class="fa fa-arrow-left text-secondary"></i></a>`}
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#yearDropdown" 
        aria-controls="yearDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="yearDropdown">
      <ul class="navbar-nav">
${broadcast.groupsArray.map((groupId) => x `
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="yearDropdownMenuLink-${groupId}" role="button" 
              data-bs-toggle="dropdown" aria-expanded="false">
            ${groupId}
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="yearDropdownMenuLink-${groupId}">
${broadcast.groups.get(groupId).episodesArray.map((e) => x `<li><a class="dropdown-item" href="${broadcast.id}-${e.group.id}-${e.id}.html" 
@click="${this.navigate.bind(this)}">${e.dateFormat} (${e.songs.list.length} Titel)</a></li> `)}
          </ul>
        </li>
`)}
      </ul>
    </div>
${episode.nextId
            ? x `<a class="nav-link" href="${broadcast.id}-${episode.nextId}.html" 
@click="${this.navigate.bind(this)}" title="Weiter" aria-label="Weiter"><i class="fa fa-arrow-right text-primary"></i></a>`
            : x `<a class="nav-link disabled"><i class="fa fa-arrow-right text-secondary"></i></a>`}
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
        // todo: TemplateResult statt string
        htmlRow(episode, song) {
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
  <a class="${song.spotify ? '' : 'd-none'}" href="${song.spotifyWeb}" title="Spotify Web"><i class="fa fa-spotify"></i></a>
  <a class="${song.spotify ? '' : 'd-none'}" href="${song.spotifyApp}" title="Spotify App"><i class="fa fa-spotify"></i></a>
</td>
</tr>`;
        }
        parseUrl() {
            const result = window.location.pathname.match(RadioApplication.PERMA_LINK);
            if (result && result.length >= 3) {
                if (result[1]) {
                    this.space = result[1];
                }
                else {
                    this.space = "zwwdp";
                }
                if (result[5]) {
                    this.groupId = result[3];
                    this.episodeId = result[5];
                }
            }
        }
        fetchBroadcast() {
            const location = `json/${this.space}.json`;
            window.fetch(location)
                .then(response => response.json())
                .then((json) => new Broadcast(json))
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
        fetchBroadcast2() {
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
                const groups = all.groups;
                all.groups = [];
                groups.forEach(group => {
                    console.info(group.id);
                    let newEpisodes = [];
                    const episodes = group.episodes;
                    Object.values(episodes).forEach(episode => {
                        let e = episode;
                        let parts = e.parts;
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
                        episodes: newEpisodes,
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
        update(event) {
            console.info("update dirty =  und episodeId = ", this.dirty, this.episodeId);
            if (this.dirty) {
                this.renderBroadcast();
                this.dirty = false;
            }
        }
        renderBroadcast() {
            console.info("render htmlMain");
            D(this.htmlMain(), this);
            console.info("render htmlRow");
            const table = this.querySelector("tbody");
            if (table) {
                table.innerHTML = "";
                const episode = this.episode;
                episode.songs.list.forEach(song => {
                    table.insertAdjacentHTML("beforeend", this.htmlRow(episode, song));
                });
            }
            this.syncTitle();
            console.info("render end");
        }
        syncTitle() {
            const rootNode = this.getRootNode();
            const title = rootNode.querySelector("head title");
            const h1 = this.querySelector("h1");
            if (title && h1) {
                title.innerHTML = h1.innerText;
            }
        }
        navigate(event) {
            // idea from https://developers.google.com/search/docs/guides/javascript-seo-basics#use-history-api
            event.preventDefault();
            const target = event.currentTarget;
            const href = target.href;
            window.history.pushState({}, document.title, href); // Update URL as well as browser history.
            this.parseUrl();
        }
    }
    RadioApplication.PERMA_LINK = /\/(zwwdp|ta|fiehe|ptw)(-([a-z0-9]+))?(-([a-z0-9]+))?\.html/;
    document.addEventListener("DOMContentLoaded", function (event) {
        window.customElements.define("radio-application", RadioApplication);
    });

})));
//# sourceMappingURL=index.js.map
