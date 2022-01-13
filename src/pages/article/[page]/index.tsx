import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from "next/router";

import Error from '@/components/Error';
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
              <div className='w-11/12 h-screen p-10 mt-32 bg-neutral-content md:p-20 md:w-5/6'>
                <div className='text-center'>
                  <h1>{article? article.title: "Loading..."}</h1>
                </div>
                <div className='flex pt-5 text-gray-600 place-content-center'>
                  {article?.tags && article.tags.map(tag => {
                    return (<div className='p-5 text-yellow-900 border-b-2' key={tag}>{tag} </div>)
                  })}
                </div>
                <div className='pt-20 xl:p-40'>
                  {
                    article? article.content.map(function(content, index) {
                        return (<Content key={index} content={content}/>)
                    })
                  : <></>}
                </div>
                <SourceSection sources={sources}/>
              </div>
            </div>
    
        </div>
      </div>
      </div>
    </>
  )
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
    fallback: false,
  }
}