// Global interfaces for the cinema app

export interface BannerProps {
  title: string;
  year: number | string;
  rating: string;
  duration: string;
  category: string;
  description: string;
  coverImageUrl: string;
  onPlayClick?: () => void;
}

export interface SliderProps {
  images: string[];
}

export interface ModalWithVideoProps {
  title: string;
  videoUrl?: string;
  youtubeUrl?: string;
  show: boolean;
  onClose: () => void;
}

export interface SidebarProps {
  hovered: boolean;
  setHovered: (value: boolean) => void;
}

export interface Movie {
  Id: string;
  Title: string;
  CoverImage: string;
  MpaRating: string;
  Duration: string;
  Description: string;
}

export interface SliderFooterProps {
  items: Movie[];
  onItemClick?: (id: string) => void;
}

export interface MovieLayoutProps {
  Id: string;
  Title: string;
  CoverImage: string;
  TitleImage: string;
  Date: string;
  ReleaseYear: number;
  MpaRating: string;
  Category?: string;
  Duration: string;
  Description: string;
  VideoUrl?: string;
  YoutubeUrl?: string;
}