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
import { IProduct, ShopContext } from '../context/ShopContext';
import { MouseEvent, useContext } from 'react';
import { toast } from 'react-toastify'
import { formatCurrency } from '../utils/formateCurrency'

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const { addCart } = useContext(ShopContext)

  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      perView: 1.8,
      spacing: 45,
    }
  })

  const handleAddCart = (event: MouseEvent<HTMLButtonElement>, product: IProduct ) => {
    event.preventDefault();
    addCart(product)
    toast.success("Produto adicionado")
  }

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

                  <button 
                    type='button'
                    onClick={(event) => handleAddCart(event, product)}
                    title='Adicionar ao carinho'
                  >
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
      price: formatCurrency.format(price.unit_amount! / 100),
      numberPrice: price.unit_amount! / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}
