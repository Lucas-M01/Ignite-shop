import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global';

import logoImg from '../assets/logo.svg';
import { Container, Header } from '../styles/pages/app';

import Image from 'next/image';
import { Handbag } from 'phosphor-react';
import { ToastContainer } from 'react-toastify'
import { useState } from 'react';
import Link from 'next/link';
import { StateContextProvider } from '../context/StateContext';
import { useCart } from '../hook/useCart';
import { ShoppingBag } from '../components/ShoppingBag';

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [ list, setList ] = useState(1)
  const { showCart } = useCart()

  return (
      <StateContextProvider>
        <Container>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            <Header>
              <Link href='/'>
                <Image src={logoImg} alt='' />
              </Link>
              <button disabled={list == 0}>
                <Handbag size={24} weight="bold" />
                {list >= 1 ? (
                  <span>{list}</span>
                  ) : <></>}
              </button>
              {showCart === true && <ShoppingBag />}
            </Header>
            <Component {...pageProps} />
        </Container>
      </StateContextProvider>
  )
}
