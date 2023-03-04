import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global';

import {  Container } from '../styles/pages/app';
import { ShopProvider } from "../context/ShopContext";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify'
import { Header } from '../components/Header';

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShopProvider>
        <Container >
            <ToastContainer 
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Header/>
            <Component {...pageProps} />
        </Container>      
      </ShopProvider>
  )
}
