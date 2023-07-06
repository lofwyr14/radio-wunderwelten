import {Group} from "./Broadcast_Group";
import {SongList} from "./SongList";

export class Episode {
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
