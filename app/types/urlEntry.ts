export interface UrlEntry {
  original_url: string;
  shortened_url: string;
}

export interface OriginalUrl {
  original_url: string;
}

export interface UrlListProps {
  urls: UrlEntry[];
}
