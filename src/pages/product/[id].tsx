import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { Button, ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'
import Head from "next/head";
import { useCart } from "@/src/hook/useCart";
import { QuantityInput } from "@/src/components/QuantityInput/QuantityInput";

export interface ProductProps {
    product: {
        id: string;
        name: string; 
        imageUrl: string;
        price: number;
        description: string;
        defaultPriceId: string;
    }
}

export default function Product({ product }: ProductProps) {
    const { onAdd, decQty, incQty, qty, cartItems } = useCart()

    return (
        <>
            <Head>
                <title>{product.name} | Ignite shop</title>
            </Head>
        
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>{product.description}</p>

                    <section>
                        Quantidade: <QuantityInput quantity={qty} onDecrease={decQty} onIncrease={incQty}/>
                    </section>

                    <Button 
                        size='large' 
                        onClick={() => {
                            onAdd(product.id, qty)
                            console.log(cartItems)
                        }}
                    >
                        Colocar na sacola
                    </Button>
                </ProductDetails>
            </ProductContainer>   
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params!.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount! / 100),
                description: product.description,
                defaultPriceId: price.id,
            },
        },
        revalidate: 60 * 60 * 1,
    }
}