import { useRouter } from "next/router";

import Error from '@/components/Error';
import UnderlineLink from '@/components/Navigation/links/UnderlineLink';
import Navbar from "@/components/Navigation/Navbar";
import Content from '@/components/section/Content';
import SourceSection from '@/components/section/SourceSection';
import Selector from "@/components/Selector";
import Seo from "@/components/Seo";

import { cleanString, getPageContent,getPages, getPageSources, IPage, IPages, ISource } from '@/notion/notion';

interface IProps {
  article: IPage,
  sources: ISource[]
  related: IPage[],
}
export default function Article({article, sources, related}: IProps) {
  const router = useRouter();
  if (!router.isFallback && !article?.title) {
    return <Error error="Page Not Found"/>
  }

  return(
    <>
    <div className='bg-gradient-to-b from-secondary to-neutral-focus'>
      <div style={{"backgroundImage": `url(${article? article.cover: ""})`}} className='h-full bg-fixed'>
        <div className='bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm'>
            <Navbar/>
            <Seo templateTitle={article? article.title: ""}/>
            <div className='flex place-content-center'>
              <article className='w-[95%] min-h-screen p-4 mt-32 bg-neutral-content md:p-20 md:w-5/6'>
                <div className='mt-5 text-center'>
                  <h1 className='text-4xl'>{article? article.title: "Loading..."}</h1>
                </div>
                <div className='flex flex-wrap pt-5 text-gray-600 place-content-center'>
                  {article?.tags && article.tags.map(tag => {
                    return (<UnderlineLink className='p-2 m-2 text-accent-content' href={`/explore?tags=${encodeURI(tag)}`} key={tag}>{tag}</UnderlineLink>)
                  })}
                </div>
                <div className='pt-20 xl:p-40'>
                  {
                    article? article.content.map((content, index) => {
                        return (<Content key={index} content={content}/>)
                    })
                  : <></>}
                </div>
                <div>
                  {
                    article? article.interactive.map((interactive, index) => {
                      return <Selector key={index} element={interactive}/>
                    }) :<></>
                  }
                </div>
                {article && related && <div className="mt-32 mb-20 lg:m-0 w-full">
                        <h2 className="font-serif text-2xl divider">Related</h2>
                  
                  <ul className="w-full justify-center flex flex-wrap gap-5">
                    {related.map((page) => {
                    return <li key={page.id} >
                      <UnderlineLink className="text base list-[square] text-center text-lg text-neutral m-auto" href={`/article/${cleanString(page.title)}`}>{page.title}</UnderlineLink>
                    </li>
                  })}
                  </ul>
                </div>}
                { article? <SourceSection sources={sources}/>:<></>}
              </article>
            </div>
    
        </div>
      </div>
      </div>
    </>)
}

export async function getStaticProps({ params, preview = false}: any) {
  // const data = await getPostAndMorePosts(params.slug, preview, previewData)
  const articles: IPages = await getPages()
  const article: IPage = articles[params.page];
  article.content = await getPageContent(article.id);
  const related: IPage[] = [];
  Object.entries(articles).map(([key]) => {
    if (article.related?.includes(articles[key].id)) {
      related.push(articles[key]);
    }
  })
  const sources= await getPageSources(article.sources);
  return {
    props: {
      preview,
      article,
      sources,
      related,
      // posts: data.posts,
    },
  revalidate: 1,
  }
}

export async function getStaticPaths() {
  // const allPosts = await getAllPostsWithSlug()
  const keys: string[] = Object.keys(await getPages());
  return {
    paths: keys.map((key) => `/article/${key}`) || [],
    fallback: true,
  }
}