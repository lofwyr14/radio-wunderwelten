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

    this.insertAdjacentHTML("afterbegin", `<table class="table"><thead>
  <tr>
    <th>Song</th>
    <th>Interpret</th>
  </tr></thead><tbody></tbody></table>`);

    this.getSongs().then(
        songs => {
          const tbody = this.querySelector("table>tbody");
          songs.forEach(measuring => {
            tbody.insertAdjacentHTML("beforeend", `<tr><td>${measuring.title}</td><td>${measuring.performer}</td></tr>`);
          });
        }
    );
  }

  getSongs(): Promise<Song[]> {
    return window.fetch("json/songs.json")
        .then(response => response.json())
        .then((json: any[]) => json.map((metering: any) => new Song(metering)))
  }

}

document.addEventListener("DOMContentLoaded", function (event) {
  window.customElements.define("radio-songs", Radio);
});
