import { createContext, ReactNode, useEffect, useState } from "react";
import { ProductProps } from "../pages/product/[id]";

interface StateContextType {
    cartItems: ProductProps[];
    showCart: boolean;
    totalPrice: number;
    totalQuantity: number;
    qty: number;
    incQty: () => void;
    decQty: () => void;
    onAdd: (product: string, quantity?: number) => void
}

interface ItemProps {
    item: {
        id: string
        quantity: number;
    }
}

interface StateContextProviderProps {
    children: ReactNode;
}

export const StateContext = createContext({} as StateContextType)

export function StateContextProvider({children}: StateContextProviderProps) {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [totalQuantity, setTotalQuantity] = useState<number>(0)
    const [qty, setQty] = useState<number>(1)

    const onAdd = ( quantity = 0, { product }: ProductProps) => {
        const checkProductInCart = cartItems.find(({item}: ItemProps) => item.id === product.id)

        if(checkProductInCart){
            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
            setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity)

            const updatedCartItems = cartItems.map(({item}: ItemProps) => {
                if(item.id === product.id) return {
                    ...item,
                    quantity: item.quantity + quantity
                }
            })
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;

            return prevQty - 1
        })
    }

    return (
        <StateContext.Provider 
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantity,
                qty,
                incQty,
                decQty,
                onAdd(product, quantity) {},
            }}
        >
            {children}
        </StateContext.Provider>
    )
}
