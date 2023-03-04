import Head from 'next/head'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ArrowContainer, HomeContainer, Product } from '../styles/pages/home'
import { GetStaticProps } from 'next'
import { CaretLeft, CaretRight, Handbag } from 'phosphor-react';
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import Link from 'next/link'
import { IProduct, ShopContext } from '../context/ShopContext';
import { MouseEvent, useContext, useState } from 'react';
import { toast } from 'react-toastify'
import { formatCurrency } from '../utils/formateCurrency'

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const { addCart } = useContext(ShopContext)

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "snap",
    initial: 0,
    slides: {
      perView: (() => {
        if(currentSlide > 0){
          return 2.8
        }
        return 1.8
      }),
      spacing: 45,
    },
    slideChanged(slider){
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    
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

        <ArrowContainer arrow='left'>
          <button onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()} disabled={currentSlide === 0} >
            <CaretLeft size={48} />
          </button>
        </ArrowContainer>
      <HomeContainer ref={sliderRef} size={currentSlide == 0 ? 'default' : 'left' } className="keen-slider">
      {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false} >
              <Product className="keen-slider__slide"  >
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
        {loaded && instanceRef.current && (
            <ArrowContainer arrow='right' >
              <button onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }>
                <CaretRight size={48} />
              </button>
            </ArrowContainer>
        )}
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
