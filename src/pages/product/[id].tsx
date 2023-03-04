import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { Button, ImageContainer, LoadingContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'
import Head from "next/head";
import { MouseEvent, useContext } from "react";
import { IProduct, ShopContext } from "@/src/context/ShopContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { formatCurrency } from "@/src/utils/formateCurrency";

export interface ProductProps {
    product: {
        id: string;
        name: string; 
        imageUrl: string;
        price: string;
        numberPrice: number;
        description: string;
        defaultPriceId: string;
    }
}

export default function Product({ product }: ProductProps) {
    const { addCart } = useContext(ShopContext)

    const handleAddCart = (event: MouseEvent<HTMLButtonElement>, product: IProduct ) => {
        event.preventDefault();
        addCart(product)
        toast.success("Produto adicionado")
      }

    const { isFallback } = useRouter()

    if (isFallback) {
        return (
            <LoadingContainer>
                <h1>Loading ...</h1>
            </LoadingContainer>
        )
    }

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

                    <Button 
                        size='large' 
                        onClick={(event) => handleAddCart(event, product)}
                        title='Adicionar ao carinho'
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
                price: formatCurrency.format(price.unit_amount! / 100),
                description: product.description,
                numberPrice: price.unit_amount! / 100,
                defaultPriceId: price.id,
            },
        },
        revalidate: 60 * 60 * 1,
    }
}