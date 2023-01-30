import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global';

import logoImg from '../assets/logo.svg';
import { Container, Header } from '../styles/pages/app';

import Image from 'next/image';
import { Handbag } from 'phosphor-react';
import { useState } from 'react';

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [ list, setList ] = useState(0)

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt='' />

        <button disabled={list == 0}>
          <Handbag size={24} weight="bold" />
          {list >= 1 ? (
            <span>{list}</span>
          ) : <></>}
        </button>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
