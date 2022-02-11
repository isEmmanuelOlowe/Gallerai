import { Client } from '@notionhq/client';
import { getDatabase } from '@notionhq/client/build/src/api-endpoints';
// import { GetDatabaseResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
const databaseID = "da0e007fc1a44318ad65821a02f17f8b";
const sourcesID = "2ea15fb73628449a8c53f0365cd5b9e1";
// const exhibitsID = "67e3f8b2126d4262b87f68dd311503ad";
// const guidesID = "4fdaf76c73cb451f996defcb61f90b94";
// Notion client for connecting with notion database
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
  caption?: string,
}

export interface ISource {
  id: string,
  type: string,
  name: string,
  cover?: string,
  content?: IContent[],
  authors?: string[],
  isbn?: string,
  publisher?: string,
  year?: number,
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
  summary: string,
  tags: string[],
  from: number,
  to: number,
  // related pages
  related?: string[],
  // sources
  sources: string[]
  // page content
  content: IContent[],
}

export interface IGuide {
  id: string,
  cover: string|null,
  title: string,
  from?: string,
  to?: string,
  content?: IContent[]
}

export interface IExhibit {
  id: string,
  cover: string|null,
  title: string,
  from?: string,
  to?: string,
  position?: boolean,
  exhibit: string,
  content?: IContent[]
}
/**
 * Extracts all the tags which are used by the notion database for content
 * @returns the tags being used by the notion database
 */
export async function getTags(): Promise<ITag[]> {
  const response: any = await notion.databases.retrieve({database_id: databaseID});
  const tags: ITag[] = response["properties"]["Tags"]["multi_select"]["options"];
  return tags;
}

/**
 * Extracts all the sources used from notion database
 * @returns all the sources used
 */
export async function getSources(): Promise<ISources> {
  const response = await notion.databases.query({database_id: sourcesID});
  const sources: ISources = extractSources(response);
  return sources
}

/**
 * Processes the sources used from the url response data
 * @param response the url response data
 * @returns the sources in a object format
 */
function extractSources(response: any): ISources {
  const sources: ISources = {};
  for (let i = 0; i < response.results.length; i++) {
    const source: ISource = {
      id: response.results[i].id,
      name: response.results[i].properties["Name"]["title"][0]["plain_text"],
      type: response.results[i].properties["Type"]["select"]["name"],
      authors: getAuthors(response.results[i].properties["Author"]["multi_select"]),
      publisher: response.results[i].properties["Publisher"]["select"]? response.results[i].properties["Publisher"]["select"]["name"]:null,
      year: response.results[i].properties["Publishing/Release Date"]["number"],
      url: response.results[i].properties["Link"]["url"],
    }
    sources[cleanString(source.name)] = source;
  }
  return sources
}


function getAuthors(authorsJson: any): string[] {
  const authors: string[] = [];
  for (let i = 0; i < authorsJson.length; i++) {
    authors.push(authorsJson[i].name);
  }

  return authors;
}
/**
 * Gets all the source information of articles
 * @param sourceIDs The sources of an article which are being linked
 * @returns The page information of all the sources of an article
 */
export async function getPageSources(sourceIDs: string[]): Promise<ISource[]> {
  const sources: ISource[] = [];
  const databaseSources: ISources = await getSources();
  for (const key in databaseSources) {
    if (sourceIDs.includes(databaseSources[key].id)) {
      sources.push(databaseSources[key]);
    } 
  }
  return sources;
}

/**
 * Gets all the sources from notion database
 * @returns a list of source objects
 */
export async function getPages(): Promise<IPages> {
  const response = await notion.databases.query({ database_id: databaseID });
  return await getPageData(response);
}

/**
 * Extracts the pages from the notion database of pages
 * @param data_json the response data
 * @returns the list of page objects
 */
async function getPageData(data_json:any): Promise<IPages> {

  const pages: IPages = {};

  for (let i = 0; i < data_json["results"].length; i++) {
    const page = data_json["results"][i];
    const pageData: IPage = {
      id: page["id"],
      title: page["properties"]["Name"]["title"][0]["text"]["content"],
      cover: getCover(page),
      summary: getSummary(page["properties"]["Summary"]),
      tags: [],
      content: [],
      sources: getPageSourceIDs(page["properties"]["Sources"]["relation"]),
      from: getYear(page["properties"]["Date From"]),
      to: getYear(page["properties"]["Date To"])
    }
    pageData.tags = stripTags(page["properties"]["Tags"]["multi_select"]);
    pages[cleanString(pageData.title)] = pageData;
  }
  return pages
}


/**
 * Extracts the summary of the articles from data
 * @param summary the json data containing the summary
 * @returns returns the summary
 */
function getSummary(summary: any) {
  if (summary["rich_text"][0]) {
    return summary["rich_text"][0]["text"]["content"]
  }
  return ""
}
/**
 * Extracts the years of validity of the article
 * @param yearData the json data containing the year
 * @returns the year stated or zero otherwise
 */
function getYear(yearData: any): number {
  if (yearData["number"] == null) {
    return 0
  }
  else {
    return yearData["number"]
  }
}
/**
 * Extracts all the names of tags from Tag object
 * @param tags the page objects being extracted
 * @returns the tag objects
 */
function stripTags(tags: ITag[]): string[] {
  const tagArray: string[] = []
  for (let i = 0; i < tags.length; i++) {
    tagArray.push(tags[i].name);
  }
  return tagArray
}

/**
 * Extracts the cover of a page from the response data if cover exists
 * @param page The page data
 * @returns URL of the page cover if it exists
 */
function getCover(page: any): string | null {
  if (!(page["properties"]["Cover Image"]["files"].length === 0)) {
    // Extracts images from external sites
    if (page["properties"]["Cover Image"]["files"][0]["type"] === "external") {
      return(page["properties"]["Cover Image"]["files"][0]["external"]["url"])
    }
    // Extracts images from the notion api
    return(page["properties"]["Cover Image"]["files"][0]["file"]["url"])
  }
  else {
    return null;
  } 
}

/**
 * Gets all the content on a Page from Notion
 * @param id the ID of the page
 * @returns a list of all the content on the page
 */
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

/**
 * Adds a determines the type of content a given block stores
 * @param blockType the block of content being extracted and type determined
 * @returns an object with the extract content and its type
 */
function addBlock(blockType: any): IContent{
    let content: IContent;
    switch(blockType["type"]) {
      case "heading_1":
        content = {"type": "heading_1", "content": blockType["heading_1"]["text"][0]["text"]["content"]}
        break;
      case "heading_2":
        content = {"type": "heading_2", "content": blockType["heading_2"]["text"][0]["text"]["content"]}
        break;
      case "image":
        content = {"type": "image", "content": blockType["image"]["external"]["url"], "caption": blockType["image"]["caption"][0]? blockType["image"]["caption"][0]["text"]["content"]: ""}
        break;
      case "quote":
        content = {"type":"quote", "content": blockType["quote"]["text"][0]["text"]["content"]}
        break;
      default:
        if (blockType["paragraph"]["text"]["0"] === undefined) {
          content = {"type":"break", "content": ""};
        }
        else {
          content =  {"type":"text", "content": blockType["paragraph"]["text"]["0"]["text"]["content"]}
        }
    }
    return content
}

/**
 * Removes characters which can not be present in URL
 * @param text the string being to be cleaned
 * @returns the cleaned string
 */
export function cleanString(text: string): string {
  return(text.replace(/[/.?=&:#]+/g, ""))
}


/**
 * Extracts the source page ids from a call of the notion API
 * @param SourceData the JSON object containing data about Source Page IDs
 * @returns a list of the source page IDs of this page
 */
function getPageSourceIDs(SourceData: any): string[] {
  const sources: string[] = [];
  for (let i =0; i < SourceData.length; i++) {
    sources.push(SourceData[i].id);
  }
  return sources;
}