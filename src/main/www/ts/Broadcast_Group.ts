import {Episode} from "./Episode";

export class Broadcast {

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

export class Group {
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
