import { useRouter } from "next/router";

import Error from '@/components/Error';
import UnderlineLink from '@/components/Navigation/links/UnderlineLink';
import Navbar from "@/components/Navigation/Navbar";
import Content from '@/components/section/Content';
import SourceSection from '@/components/section/SourceSection';
import Seo from "@/components/Seo";

import { getPageContent,getPages, getPageSources, IPage, IPages, ISource } from '@/notion/notion';

interface IProps {
  article: IPage,
  sources: ISource[]
}
export default function Article({article, sources}: IProps) {
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
                    return (<UnderlineLink className='p-2 m-2 text-accent-content' href={`/explore?tags=${encodeURI(tag)}`} key={tag} openNewTab={true}>{tag}</UnderlineLink>)
                  })}
                </div>
                <div className='pt-20 xl:p-40'>
                  {
                    article? article.content.map(function(content, index) {
                        return (<Content key={index} content={content}/>)
                    })
                  : <></>}
                </div>
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
  const sources= await getPageSources(article.sources);
  return {
    props: {
      preview,
      article,
      sources,
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