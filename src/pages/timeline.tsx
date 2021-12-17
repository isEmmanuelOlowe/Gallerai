import Timeline from "@/components/Interactive/Timeline";
import Navbar from "@/components/Navigation/Navbar";
import Seo from "@/components/Seo";

export default function TimelinePage() {
  return(
    <>
      <Seo templateTitle="Timeline of Mathematics in Scottish Enlightenment"/>
      <div>
      <Navbar/>
      <Timeline/>
      </div>
    </>
  )
}