import { Client } from '@notionhq/client';
// import { GetDatabaseResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
const databaseID = "da0e007fc1a44318ad65821a02f17f8b";
const sourcesID = "2ea15fb73628449a8c53f0365cd5b9e1";

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
  id: string,
  type: string,
  name: string,
  cover?: string,
  content?: IContent[],
  authors?: string[],
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
  related?: string[],
  // sources
  sources?: string[]
  // page content
  content: IContent[],
}

export async function getTags(): Promise<ITag[]> {
  const response: any = await notion.databases.retrieve({database_id: databaseID});
  const tags: ITag[] = response["properties"]["Tags"]["multi_select"]["options"];
  return tags;
}

export async function getSources(): Promise<ISources> {
  const response = await notion.databases.query({database_id: sourcesID});
  const sources: ISources = extractSources(response);
  return sources
}

function extractSources(response: any): ISources {
  const sources: ISources = {};
  for (let i = 0; i < response.results.length; i++) {
    const source: ISource = {
      id: response.results[i].id,
      name: response.results[i].properties["Name"]["title"][0]["plain_text"],
      type: response.results[i].properties["Type"]["select"]["name"],
      publisher: response.results[i].properties["Publisher"]["select"]["name"],
      year: response.results[i].properties["Publishing/Release Date"]["number"],
      url: response.results[i].properties["Link"]["url"],
    }
    sources[cleanString(source.name)] = source;
  }
  return sources
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

export async function getPageContent(id: string): Promise<IContent[]> {
  const content: IContent[] = [];

  const blocks = await notion.blocks.children.list({
    block_id: id,
    page_size: 50,
  });

  for (let i = 0; i < blocks["results"].length; i++) {
    content.push(addBlock(blocks["results"][i]));
  }

  return content
}

function addBlock(blockType: any): IContent{
    let content: IContent;
    switch(blockType["type"]) {
      default:
        content =  {"type":"text", "content": blockType["paragraph"]["text"]["0"]["plain_text"]}
    }
    return content
}

/**
 * Removes characters which can not be present in URL
 * @param text the string being to be cleaned
 * @returns the cleaned string
 */
function cleanString(text: string): string {
  return(text.replace("/[/.?=&:#]+/g", ""))
}