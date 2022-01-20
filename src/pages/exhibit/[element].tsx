import MaclaurenSeries from "@/components/Interactive/Element/MaclaurenSeries";
import Navbar from "@/components/Navigation/Navbar";
import Seo from "@/components/Seo";

export default function ExhibitPage() {
  
  return (
    <>
    <div className='bg-gradient-to-b from-primary-focus to-neutral-focus'>
      <div className='h-full bg-fixed'>
        <div className='bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm'>
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
                <div className='pt-20 xl:p-40'>
                  <div className="justify-center w-full m-auto">
                    <MaclaurenSeries/>
                  </div>
                  <div>

                  </div>
              </div>
            </div>
    
        </div>
      </div>
      </div>
      </div>
    </>
  )
}