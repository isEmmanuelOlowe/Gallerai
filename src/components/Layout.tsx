import * as React from 'react';
import { useContext } from 'react';

import Navbar from '@/components/Navbar';

import IPages from '@/notion/notion'

export default function Layout(props: any) {
  const Data = useContext("");
  return (
    <>
      {props.children}
    </>

  );
}