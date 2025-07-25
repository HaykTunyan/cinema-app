// Global types for the cinema app
import type { StaticImageData } from "next/image";

export interface Movie {
  Id: string;
  Title: string;
  CoverImage: string;
  TitleImage: string;
  Date: string;
  ReleaseYear: number;
  MpaRating: string;
  Category: string;
  Duration: string | number;
  Description: string;
}

export interface DataInformation {
  Featured: Movie;
  TendingNow: Movie[];
}

export type SidebarItemProps = {
  src: string | StaticImageData;
  label: string;
  href?: string;
  hovered: boolean;
};