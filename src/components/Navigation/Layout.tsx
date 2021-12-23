import {FC} from 'react';

import Navbar from '@/components/Navigation/Navbar'
type Props = {

}


const Layout: FC<Props> = ({children}) => {
  return (
    <div className="w-screen">
    <Navbar/>
      {children}
    </div>
  );
}

export default Layout;