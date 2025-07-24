//


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