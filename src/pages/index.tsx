import Head from 'next/head'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { HomeContainer, Product } from '../styles/pages/home'
import { GetStaticProps } from 'next'
import { Handbag } from 'phosphor-react';
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import Link from 'next/link'
import { useCart } from '../hook/useCart'

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const { onAdd } = useCart()
  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      perView: 2.83,
      spacing: 45,
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false} >
              <Product className="keen-slider__slide" >
                <Image src={product.imageUrl} alt="" width={520} height={480} />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <button >
                    <Handbag size={24} weight="bold" />
                  </button>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}
