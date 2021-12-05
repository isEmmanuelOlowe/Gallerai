import Navbar from "./Navbar";
import Seo from "./Seo";

export default function Error() {

  return(
    <>
    <div className="h-screen">
    <Navbar/>
    <Seo/>
      <div className="flex items-center w-screen h-5/6">
        <div className="flex content-center w-screen place-content-center">
            <h1 className="p-5 border-2 border-blue-500 rounded-full">Opps! Page not found</h1>
        </div>
      </div>
    </div>
    </>
  )
}