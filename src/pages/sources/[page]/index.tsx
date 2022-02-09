import { useRouter } from "next/router";

import Error from '@/components/Error';
import Navbar from "@/components/Navigation/Navbar";
import Seo from "@/components/Seo";

import { getSources, ISource} from "@/notion/notion";

interface IProps {
  source: ISource
}
export default function Source({source}: IProps) {
  const router = useRouter();

  
  if (!router.isFallback && !source?.name) {
    return <Error error="Page Not Found"/>
  }


  return (
<div className='bg-gradient-to-b from-secondary-focus to-neutral-focus'>
      <div className='h-full bg-fixed'>
        <div className='bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm'>
            <Seo/>
            <Navbar/>
            {/* <Seo templateTitle={article? article.title: ""}/> */}
            <div className='flex place-content-center'>
              <div className='w-[95%] min-h-screen p-4 mt-32 bg-neutral-content md:p-20 md:w-5/6'>
                <div className='mt-5 text-center'>
                  {/* <h1 className='text-4xl'>{article? article.title: "Loading..."}</h1> */}
                </div>
                <div className='flex flex-wrap pt-5 text-gray-600 place-content-center'>
                  {/* {article?.tags && article.tags.map(tag => {
                    return (<UnderlineLink className='p-2 m-2 text-accent-content' href={`/explore?tags=${encodeURI(tag)}`} key={tag} passHref>{tag}</UnderlineLink>)
                  })} */}
                </div>
                <div className='mt-5 text-center'>
                  <h1 className='text-4xl'>{source? source.name: "Loading..."}</h1>
                </div>
                <div className='flex flex-wrap pt-5 text-gray-600 place-content-center'>
                    {
                      source? <>
                      <span>
                        {source.publisher}
                      </span>
                      <span>
                        {source.isbn}
                      </span>
                        {source.authors?.map(author => {
                          return <span key={author}>{author}</span>
                        })}
                      <span>
                      </span>
                      </>:
                      <></>
                    }
                </div>
                <div className='pt-20 xl:p-40'>
                  <div>

                  </div>
              </div>
            </div>
    
        </div>
      </div>
      </div>
      </div>
  )
}


export async function getStaticProps({ params, preview = false}: any) {
  const sources = await getSources();
  const source: ISource = sources[params.page];
  return {
    props : {
      source
    },
    revalidate: 1,
  }
}


export async function getStaticPaths() {
  // const allPosts = await getAllPostsWithSlug()
  const keys: string[] = Object.keys(await getSources());
  return {
    paths: keys.map((key) => `/sources/${key}`) || [],
    fallback: true,
  }
}