import "./Song";
import {Song} from "./Song";

export class SongList {

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
