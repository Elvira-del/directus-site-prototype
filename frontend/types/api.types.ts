export interface Schema {
  pages: IPages[];
  pages_blocks: IPagesBlocks[];
  posts: IPosts[];
  error_solutions: IErrorSolutions[];
  error_symptoms: IErrorSymptoms[];
  error_causes: IErrorCauses[];
  error_solutions_error_symptoms: IErrorSolutionsSymptoms[];
  error_solutions_error_causes: IErrorSolutionsCauses[];
  features: IFeatures[];
  partners: IPartners[];
  partner_categories: IPartnerCategories[];

  block_hero: IBlockHero[];
  block_richtext: IBlockRichtext[];

  block_cardgroup: IBlockCardGroup[];
  block_cardgroup_posts: IBlockCardGroupPosts[];
  block_cardgroup_cards: IBlockCardGroupCards[];

  block_ticker: IBlockTicker[];
  block_ticker_ticker_items: IBlockTickerItems[];
  block_ticker_partners: IBlockTickerPartners[];
  
  block_features: IBlockFeatures[];
  block_features_released_features: IBlockFeaturesReleasedFeatures[]
}

export interface IPages {
  id: string;
  title: string;
  slug: string;
  blocks: number[] | IPagesBlocks[]
}

export interface IPagesBlocks { 
  id: number;
  pages_id: string | IPages;
  item: IBlockTicker | IBlockCardGroup | IBlockHero | IBlockRichtext | IBlockFeatures;
  collection: "block_cardgroup" | "block_hero" | "block_richtext" | "block_ticker" | "block_features";
  sort: number;
}

export interface IPosts {
  id: string;
  title: string;
  excert: string | TrustedHTML;
  content: string | TrustedHTML;
  image: {
    id: string;
    title: string;
  };
  status: string;
  slug: string;
  featured: boolean;
  user_created: string;
  date_created: "datetime";
  user_updated: string;
  date_updated: "datetime";
  sort: number;
  seo: number | ISEO;  
  tags: string[];
};

export interface ISEO {
  id: number;
  title: string;
  meta_description: string | TrustedHTML;
  canonical_url: string;
  no_index: boolean;
  no_follow: boolean;
  og_image: string;
  sitemap_change_frequency: string;
  sitemap_priority: number;
}

export interface IErrorSolutions {
  id: string;
  code: string;
  title: string;
  description: string | TrustedHTML;
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  symptoms: IErrorSolutionsSymptoms[];
  causes: IErrorSolutionsCauses[];
  tags: string[];
  status: "published" | "draft" | "archived";
  sort: number;
  date_updated: string;
}

export interface IErrorSolutionsSymptoms { 
  id: number;
  error_solutions_id: IErrorSolutions;
  error_symptoms_id: IErrorSymptoms;
}

export interface IErrorSolutionsCauses {
  id: number;
  error_solutions_id: IErrorSolutions;
  error_causes_id: IErrorCauses;
}

export interface IErrorSymptoms {
  id: string;
  title: string
}
 
export interface IErrorCauses {
  id: string;
  title: string
}

export interface IFeatures {
  id: string;
  name: string;
  description: string;
  details: string | TrustedHTML;
  status: "published" | "draft" | "archived";
}

export interface IPartners {
  id: string;
  name: string;
  description: string | TrustedHTML;
  slug: string;
  logo: string;
  website: string;
  category: IPartnerCategories;
  featured: boolean;
  status: "published" | "draft" | "archived";
  sort: number;
};

export interface IPartnerCategories { 
  id: string;
  name: string;
  slug: string;
  partner: number[] | IPartners[];
}

export interface IBlockHero { 
  id: string;
  headline: string;
  content: string | TrustedHTML;
  buttons: {label: string}[];
  image: string;
}

export interface IBlockRichtext { 
  id: string;
  headline: string;
  content: string | TrustedHTML;
}

export interface IBlockCardGroup {
  id: string;
  headline: string;
  content: string | TrustedHTML;
  group_type: string;
  cards?: IBlockCardGroupCards[];
  posts?: IBlockCardGroupPosts[];
}

export interface IBlockCardGroupPosts {
  id: number;
  block_cardgroup_id: string | IBlockCardGroup;
  posts_id: IPosts;
}

export interface IBlockCardGroupCards {
  id: number;
  title: string | IBlockCardGroup;
}

export interface IBlockTicker {
  id: string;
  headline: string;
  content: string | TrustedHTML;
  ticker_partners: number[] | IPartners[];
  ticker_items: IPartners;
}

export interface IBlockTickerItems {
  id: number;
  block_ticker_id: string | IBlockTicker;
  item: string;
  collection: "partners";
}

export interface IBlockTickerPartners {
  id: number;
  block_ticker_id: string | IBlockTicker;
  partners_id: string | IPartners;
}

export interface IBlockFeatures {
  id: string;
  headline: string;
  content: string | TrustedHTML;
  released_features: number[] | IBlockFeaturesReleasedFeatures[];
}

export interface IBlockFeaturesReleasedFeatures {
  id: number;
  block_features_id: string | IBlockFeatures;
  item: string | IFeatures;
  collection: "features";
  sort: number;
}




