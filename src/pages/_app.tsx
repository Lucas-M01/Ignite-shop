import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global';

import logoImg from '../assets/logo.svg';
import { Container, Header, StyledModal } from '../styles/pages/app';

import { Handbag } from 'phosphor-react';
import { ToastContainer } from 'react-toastify'
import { ShoppingBag } from '../components/ShoppingBag';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { StateContextProvider } from '../context/StateContext';
import { css } from '../styles';
import { useCart } from '../hook/useCart';

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [ list, setList ] = useState(1)
  const { showCart, setShowCart, totalQuantities } = useCart()

  

  return (
    <StateContextProvider>
        <Container >
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
              <button disabled={totalQuantities == 0} onClick={() => setShowCart(true)} >
                <Handbag size={24} weight="bold" />
                {totalQuantities >= 1 ? (
                  <span>{totalQuantities}</span>
                  ) : <></>}
                  
                {/* <StyledModal
                  isOpen={showCart}
                  onRequestClose={() => setShowCart(false)}
                  shouldCloseOnOverlayClick={true}
                  ariaHideApp={false}
                >
                  <ShoppingBag/>
                </StyledModal> */}
              </button>
              
            </Header>
            <Component {...pageProps} />
        </Container>
      </StateContextProvider>
  )
}
