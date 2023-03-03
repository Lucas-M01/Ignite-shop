import * as Dialog from '@radix-ui/react-dialog';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Handbag } from 'phosphor-react';
import { useContext } from 'react';
import logoImg from '../../assets/logo.svg';
import { ShopContext } from '../../context/ShopContext';
import { Cart } from '../Cart';
import { ButtonCartContainer, HeaderContainer } from "./styles";

export function Header() {
  const { itemProductDuplicated } = useContext(ShopContext)

  const { pathname } = useRouter();

  const showCartButton = pathname !== "/success";

  return (
    <HeaderContainer >
        <Link href='/'>
            <Image src={logoImg} alt="" />
        </Link>

      {showCartButton && (
            <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <ButtonCartContainer disabled={itemProductDuplicated.length == 0}>
                      <Handbag size={24} weight="bold" />
                      {itemProductDuplicated.length >= 1 &&
                       <span>{itemProductDuplicated.length}</span>
                      }
                    </ButtonCartContainer>
                  </Dialog.Trigger>
                <Cart />
            </Dialog.Root>
        )}
    </HeaderContainer>
  )
}