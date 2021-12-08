import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from "next/router";

import Error from '@/components/Error';
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";

import { getPages, IPage, IPages } from '@/notion/notion';

interface IProps {
  article: IPage
}
export default function Article({article}: IProps) {
  const router = useRouter();

  if (!router.isFallback && !article?.title) {
    return <Error/>
  }

  return(
    <>
    <div className='bg-gradient-to-b from-yellow-400 via-red-500 to-blue-500'>
      <div style={{"backgroundImage": `url(${article? article.cover: ""})`}} className='h-full bg-fixed'>
        <div className='bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm'>
            <Navbar/>
            <Seo/>
            <div className='flex place-content-center'>
              <div className='w-11/12 h-screen p-10 mt-32 bg-white md:p-20 md:w-5/6'>
                <div className='text-center'>
                  <h1>{article? article.title: "Loading..."}</h1>
                </div>
                <div className='flex pt-5 text-gray-600 place-content-center'>
                  {article?.tags && article.tags.map(tag => {
                    return (<div className='p-5 text-yellow-400 border-b-2' key={tag}>{tag} </div>)
                  })}
                </div>
                <div className='pt-20 xl:p-40'>
                  {
                    article? article.content.map(content => {
                        return (<div key={content.content}><p>{content.content}</p></div>)
                    })
                  : <></>}
                </div>
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
  return {
    props: {
      preview,
      article,
      // posts: data.posts,
    },
    revalidate: 2,
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