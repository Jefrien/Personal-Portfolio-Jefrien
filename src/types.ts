export interface Project {
    id:         number;
    attributes: ProjectAttr;
}

export interface LocalizationAttributes {
    name:        string;
    description: string;
    url:         string;
    git_url:     string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    locale:      string;
    slug:        string;
}

export interface LocalizationData {
    id:         number;
    attributes: LocalizationAttributes;
}

export interface Localizations {
    data: LocalizationData[];
}

export interface SingleDetail {
    id:              number;
    section_content: SectionContent[];
    section_image:   SectionImage;
}


export interface SectionContent {
    type:     SectionContentType;
    children: SectionContentChild[];
    format?:  string;
}

export interface SectionContentChild {
    text?:     string;
    type:      ChildType;
    bold?:     boolean;
    children?: ChildChild[];
}

export interface ChildChild {
    text: string;
    type: ChildType;
}

export enum ChildType {
    ListItem = "list-item",
    Text = "text",
}

export enum SectionContentType {
    List = "list",
    Paragraph = "paragraph",
}

export interface SectionImage {
    data: SectionImageData;
}

export interface SectionImageData {
    id:         number;
    attributes: FluffyAttributes;
}

export interface FluffyAttributes {
    name:              string;
    alternativeText:   null | string;
    caption:           null;
    width:             number;
    height:            number;
    formats:           FluffyFormats;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    createdAt:         Date;
    updatedAt:         Date;
}

export interface Thumbnail {
    ext:    string;
    url:    string;
    hash:   string;
    mime:   string;
    name:   string;
    path:   null;
    size:   number;
    width:  number;
    height: number;
}

export interface FluffyFormats {
    thumbnail: Thumbnail;
    large?:    Thumbnail;
    small?:    Thumbnail;
    medium?:   Thumbnail;
}


export interface ProjectAttr {
    name:        string;
    description: string;
    url:         string;
    git_url:     string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    locale:      string;
    image: ProjectImageData;
    tecnologias: TecnologiesData;
    slug:        string;
    localizations?: Localizations;
    single_details?: SingleDetail[];
}

export interface ProjectImageData {
    data: ProjectImage;
}

export interface ProjectImage {
    attributes: Image;
}

export interface Image {
    id:                number;
    name:              string;
    alternativeText:   string;
    caption:           null;
    width:             number;
    height:            number;
    formats:           Formats;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    createdAt:         Date;
    updatedAt:         Date;
}

export interface Formats {
    thumbnail: Small;
    small:     Small;
    medium:    Small;
}

export interface Small {
    name:   string;
    hash:   string;
    ext:    string;
    mime:   string;
    path:   null;
    width:  number;
    height: number;
    size:   number;
    url:    string;
}

export interface TecnologiesData {
    data: Teconology[];
}

export interface Teconology {
    id:         number;
    attributes: TeconologyAttributes;
}

export interface TeconologyAttributes {
    logo: any;
    name:        string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
}

export interface TextStyle {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
    text: string;
  }
  
  export interface BaseBlock {
    type: string;
    children?: (Block | TextStyle)[];
  }
  
  export interface ParagraphBlock extends BaseBlock {
    type: 'paragraph';
  }
  
  export interface HeadingBlock extends BaseBlock {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
  }
  
  export interface ListBlock extends BaseBlock {
    type: 'list';
    format: 'ordered' | 'unordered';
  }
  
  export interface ListItemBlock extends BaseBlock {
    type: 'list-item';
  }
  
  export interface LinkBlock extends BaseBlock {
    type: 'link';
    url: string;
    openInNewTab?: boolean;
  }
  
  export interface ImageBlock extends BaseBlock {
    type: 'image';
    url: string;
    alternativeText?: string;
  }
  
  export interface CodeBlock extends BaseBlock {
    type: 'code';
    language?: string;
  }
  
  export interface QuoteBlock extends BaseBlock {
    type: 'quote';
  }
  
  export type Block = 
    | ParagraphBlock 
    | HeadingBlock 
    | ListBlock 
    | ListItemBlock 
    | LinkBlock 
    | ImageBlock 
    | CodeBlock 
    | QuoteBlock;