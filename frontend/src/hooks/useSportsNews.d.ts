export type SportsNewsArticle = {
  id: string,`n  title: string;,`n  summary: string,`n  link: string;,`n  publishedAt: string,`n  source: string;
  imageUrl?: string;
  category?: string;};
export declare function useSportsNews(): {
  articles: SportsNewsArticle[0],`n  loading: boolean;,`n  error: string | null};


`
