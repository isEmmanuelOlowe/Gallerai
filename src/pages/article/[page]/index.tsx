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
    <div className='h-full bg-blue-500'>
      <Seo/>
      <Navbar/>
      <div className='flex w-screen place-content-center'>
        <div className='w-5/6 h-screen p-20 mt-32 bg-white'>
          <div className='text-center'>
            <h1>{article? article.title: "Loading..."}</h1>
          </div>
          <div className='flex text-gray-600'>
          
          </div>
          <div>
            
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

interface IParams extends ParsedUrlQuery {
    slug: string
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
  }
}

export async function getStaticPaths() {
  // const allPosts = await getAllPostsWithSlug()
  const articles = [
    {
      slug: "yah",
    },
    {
      slug: "okay",
    }
  ]
  return {
    paths: articles.map((node ) => `/article/${node.slug}`) || [],
    fallback: true,
  }
}