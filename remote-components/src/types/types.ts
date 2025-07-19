export interface IArtist {
  id: string;
  name: string;
  image: string;
  description: string;
  monthlyListeners: string;
}

export interface ITrack {
  id: string;
  no: number;
  name: string;
  duration: string;
  mediaurl: string;
  explicit: boolean;
  playcount: string;
}

export interface IAlbum {
  id: string;
  year: number;
  name: string;
  songs: number;
  image: string;
  minutes: number;
  artist: IArtist;
  explicit: boolean;
  tracks?: ITrack[] | null;
}

export interface ITrackContext {
  muted: boolean;
  volume: number;
  audioRef: React.RefObject<HTMLAudioElement> | null; // Changed to avoid ambiguity
  prevTrack: ITrack | null;
  nextTrack: ITrack | null;
  currentState: string | null; // Optional is removed since it's not strictly necessary here
  currentTrack: ITrack | null; // Optional is removed since it's not strictly necessary here
  currentAlbum: IAlbum | null; // Optional is removed since it's not strictly necessary here
  trackDuration: number;
  currentProgress: number;
  addItem: (track: ITrack, album: IAlbum) => void;
  changeState: (state: string) => void;
  handlePlayPause: (track: ITrack, album: IAlbum) => void;
  handleMuteChange: () => void;
  handleVolumeChange: (volumeValue: number) => void;
  handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
