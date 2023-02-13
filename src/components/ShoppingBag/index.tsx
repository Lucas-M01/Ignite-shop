import { ProductProps } from "@/src/pages/product/[id]";
import { BagContainer, ListItems, Cart } from "@/src/styles/components/shoppingBag";
import axios from "axios";
import { useState } from "react";

export function ShoppingBag({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    
    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (err) {
            setIsCreatingCheckoutSession(false)

            alert('Falha ao redirecionar ao checkout')
        }
    }

    return (
        <BagContainer>
            <Cart>
                <strong>Sacola de compras</strong>
                <p>1?!? item</p>
                <ListItems>
                    
                </ListItems>
            </Cart>
        </BagContainer>
    )
}