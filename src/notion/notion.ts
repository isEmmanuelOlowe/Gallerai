import { Client } from '@notionhq/client';
const databaseID = "da0e007fc1a44318ad65821a02f17f8b";
const notion = new Client({auth: process.env.TOKEN});

export interface IPages {
    [Key: string]: IPage;
}

export interface ISources {
  [key: string]: ISource;
}

export interface ITag {
  id: string;
  name: string;
  color: string;
}

export interface IContent {
  type: string,
  content: string,
}

export interface ISource {
  type: string,
  name: string
  content: IContent[],
  authors: string[],
  isbn?: string,
  publisher: string,
  year: number,
  url: string,
  pdf?: string,
  extracts?: string,
  file?: string
  related?: string[]
}

export interface IPage {
  id: string,
  cover: string|null,
  title: string,
  tags: string[],
  from?: number,
  to?: number,
  // related pages
  related: string[],
  // sources
  sources: string[]
  // page content
  content: IContent[],
}

export async function getTags(): Promise<ITag[]> {
  const response: any = await notion.databases.retrieve({database_id: databaseID});
  const tags: ITag[] = response["properties"]["Tags"]["multi_select"]["options"];
  return tags;
}

export async function getPages(): Promise<IPages> {
  const response = await notion.databases.query({ database_id: databaseID });
  return await getPageData(response);
}

async function getPageData(data_json:any): Promise<IPages> {

  const pages: IPages = {};

  for (let i = 0; i < data_json["results"].length; i++) {
    const page = data_json["results"][i];
    const pageData: IPage = {
      id: page["id"],
      title: page["properties"]["Name"]["title"][0]["text"]["content"],
      cover: getCover(page),
      tags: [],
      content: [],
    }
    pageData.tags = stripTags(page["properties"]["Tags"]["multi_select"]);
    const blocks = await notion.blocks.children.list({
      block_id: page["id"],
      page_size: 50,
    });
   
    const content: any = blocks["results"];
    for (let i = 0; i < content.length; i++) {
      pageData.content.push(content[i]["paragraph"]["text"][0]["plain_text"]);
    }
    pages[cleanString(pageData.title)] = pageData;
  }
  return pages
}

function stripTags(tags: ITag[]): string[] {
  const tagArray: string[] = []
  for (let i = 0; i < tags.length; i++) {
    tagArray.push(tags[i].name);
  }
  return tagArray
}

function getCover(page: any): string | null {
  if (!(page["properties"]["Cover Image"]["files"].length === 0)) {
    return(page["properties"]["Cover Image"]["files"][0]["file"]["url"])
  }
  else {
    return null;
  }
}

function cleanString(text: string): string {
  return(text.replace("/[/.?=&:#]+/g", ""))
}