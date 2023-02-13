import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CartItems {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
}

interface StateContextType {
    showCart: boolean;
    setShowCart: (value: boolean) => void;
    cartItems: CartItems[];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    incQty: () => void;
    decQty: () => void;
    toggleCartItemQuantity: (id: string, value: 'inc' | 'dec') => void;
    onAdd: (product: any, quantity: number) => void;
    setCartItems: (items: Array<any>) => void;
    setTotalPrice: (price: number) => void;
    setTotalQuantities: (quantities: number) => void;
}

interface StateContextProviderProps {
    children: ReactNode;
}

export const StateContext = createContext({} as StateContextType)

export function StateContextProvider({children}: StateContextProviderProps) {
    const [showCart, setShowCart] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<Array<any>>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [totalQuantities, setTotalQuantities] = useState<number>(0)
    const [qty, setQty] = useState<number>(1)

    let foundProduct: any;
    let index;

    const onAdd = ( product: any, quantity: number) => {
        const checkProductInCart = cartItems.find((item) => item.id === product.id)

        if(checkProductInCart){
            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
            setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity)

            const updatedCartItems = cartItems.map((item) => {
                if(item.id === product.id) return {
                    ...item,
                    quantity: item.quantity + quantity
                }
            })

            setCartItems(updatedCartItems)
        } else {
            product.quantity = quantity

            setCartItems([...cartItems, {...product}])
        }

        toast.success(`${qty} ${product.name} adicionado ao carrinho`)
    }

    const toggleCartItemQuantity = (id: string, value: 'inc' | 'dec') => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id)
    
        if(value === 'inc') {
          setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
          setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if(value === 'dec') {
          if (foundProduct.quantity > 1) {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
          }
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
                setShowCart,
                cartItems,
                totalPrice, 
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                setCartItems,
                setTotalPrice,
                setTotalQuantities 
            }}
        >
            {children}
        </StateContext.Provider>
    )
}