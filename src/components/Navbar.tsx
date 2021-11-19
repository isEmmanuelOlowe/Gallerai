import Link from 'next/link';
import * as React from 'react';
import { useEffect,useState } from 'react';

export default function Navbar() {
    const [expanded, setExpanded] = useState("hidden");
    const [scrollY, setScrollY] = useState(0);
    const [bg, setBG] = useState("bg-white h-screen");
    
    useEffect(()=> {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            if (window.scrollY > 1) {
                setBG("bg-gray-200 border-solid border-gray-700 shadow")
            }
            else {
                setBG("bg-transparent text-gray-800 border-none")
            }
        };

            //triggered when initial state is updated
            handleScroll();
            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
    }, []); 
    return (
        <>
            <nav className={"z-50 bg-opacity-40 sticky top-0 flex flex-wrap items-center justify-between min-w-full py-4 border-none first-letter:fixed lg:px-12 " + bg}>
                <div className="flex justify-between w-full h-full pl-6 pr-2 border-gray-300 border-solid lg:w-auto lg:border-b-0 lg:pb-0">
                <div className="flex items-center flex-shrink-0 h-full mr-16 ">
                    <span className="text-xl font-semibold tracking-tight duration-300 ease-in-out hover:scale-110"><Link href="/"><a>GALLERAI</a></Link></span>
                </div>
                <div className="block lg:hidden" onClick={() => setExpanded(expanded === "hidden"? "": "hidden")}>
                    <button id="nav" className="flex items-center px-3 py-2 text-black border-2 border-black rounded">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                    </button>
                </div>
                </div>
                <div className={`flex-grow w-full px-8 menu lg:flex lg:items-center lg:w-auto lg:px-3 ${expanded}`}>
                <div className="font-bold text-md lg:flex-grow">
                    <Link href="/explore"><a className="block px-4 py-2 mt-4 mr-2 duration-500 ease-in-out hover:bg-opacity-50 hover:scale-110 lg:inline-block lg:mt-0 hover:text-black hover:bg-gray-300">
                    Explore
                    </a></Link>
                    <a href="#responsive-header" className="block px-4 py-2 mt-4 mr-2 duration-500 ease-in-out hover:bg-opacity-50 hover:scale-110 lg:inline-block lg:mt-0 hover:text-black hover:bg-gray-300">
                    Guides
                    </a>
                    <a href="#responsive-header" className="block px-4 py-2 mt-4 mr-2 duration-500 ease-in-out hover:bg-opacity-50 hover:scale-110 lg:inline-block lg:mt-0 hover:text-black hover:bg-gray-300">
                    Exhibits
                    </a>
                </div>
                {/* This is an example component */}
                <div className="relative mx-auto text-gray-600 lg:block">
                    <input className="h-10 pl-2 pr-8 text-sm bg-transparent border-none focus:outline-none focus:ring-gray-100 focus:ring-b-2 focus:bg-gray-300 focus:text-black" type="search" name="search" placeholder="Search" />
                    <button type="submit" className="absolute top-0 right-0 mt-3 mr-2">
                    <svg className="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966"  xmlSpace="preserve" width="512px" height="512px">
                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                    </button>
                </div>
                {/* <div className="flex ">
                    <a href="#" className="block px-4 py-2 mt-4 ml-2 font-bold text-blue-700 rounded text-md hover:text-white hover:bg-blue-700 lg:mt-0">Sign
                    in</a>
                    <a href="#" className="block px-4 py-2 mt-4 ml-2 font-bold text-blue-700 rounded text-md hover:text-white hover:bg-blue-700 lg:mt-0">login</a>
                </div> */}
                </div>
            </nav>
        </>
    );
}

