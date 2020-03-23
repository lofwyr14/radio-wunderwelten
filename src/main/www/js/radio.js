class Song {
    constructor(song) {
        this.title = song.title;
        this.interpret = song.interpret;
    }
}
class Radio extends HTMLElement {
    constructor() {
        super();
        this.format = new Intl.DateTimeFormat('de-DE', {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        });
        console.log("Song");
    }
    connectedCallback() {
        this.insertAdjacentHTML("afterbegin", `<table class="table"><thead>
  <tr>
    <th>Song</th>
    <th>Interpret</th>
  </tr></thead><tbody></tbody></table>`);
        this.getMeasurings().then(songs => {
            const tbody = this.querySelector("table>tbody");
            songs.forEach(measuring => {
                const tr = document.createElement("tr");
                tbody.insertAdjacentElement("beforeend", tr);
                tr.insertAdjacentHTML("beforeend", "<td>" + measuring.title + "</td>");
                tr.insertAdjacentHTML("beforeend", "<td>" + measuring.interpret + "</td>");
            });
        });
    }
    getMeasurings() {
        return window.fetch("json/songs.json")
            .then(response => response.json())
            .then((json) => json.map((metering) => new Song(metering)));
    }
}
document.addEventListener("DOMContentLoaded", function (event) {
    window.customElements.define("radio-songs", Radio);
});
