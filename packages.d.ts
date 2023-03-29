declare module 'yt-player' {
  export default class YTPlayer {
    constructor (selector: string);
    setSize(width: number, height: number): void;
    load(videoId: string): void;
    destroy(): void;
  }
}