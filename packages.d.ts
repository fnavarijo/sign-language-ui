declare module 'youtube-player' {
  type YoutubePlayerOptions = {
    width: number,
    height: number,
    videoId: string,
    playerVars: object
  }
  
  type YoutubePlayerProxy = {
    playVideo(): void
  }

  export default function YoutubePlayer (selector: string, options: Partial<YoutubePlayerOptions>): YoutubePlayerProxy;
}