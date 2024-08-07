export class Song {

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
