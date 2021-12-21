import { RiAlarmWarningFill } from "react-icons/ri";

import CustomLink from "@/components/Navigation/links/CustomLink";
import Navbar from "@/components/Navigation/Navbar";
import Seo from "@/components/Seo"

interface props {
  error: string
  seo?: string
}

export default function Error({error, seo}: props) {

  return(
    <>
      <Seo templateTitle={`${seo? seo: error}`} />

      <main>
      
        <section className='h-screen bg-base-content'>
          <Navbar textColour='text-white'/>
          <div className='flex flex-col items-center justify-center text-center text-white h-[90vh] layout'>
            <RiAlarmWarningFill
              size={60}
              className='text-yellow-300 animate-flicker drop-shadow-glow'
            />
            <h1 className='mt-8'>{error}</h1>
            <CustomLink className='mt-4' href='/'>
              Back to Home
            </CustomLink>
          </div>
        </section>
      </main>
    </>
  )
}