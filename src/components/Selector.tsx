import MaclaurenSeries from "@/components/Interactive/Element/MaclaurenSeries";

interface props {
  element: string;
}

export default function Selector({element}: props) {
  
  switch(element) {
    case "Maclaurin":
      return <MaclaurenSeries/>
    default:
      return <></>
  }
}