import { QuantityInputContainer } from "@/src/styles/components/quantityInput";
import { Button } from "@/src/styles/pages/product";
import { Minus, Plus } from "phosphor-react";

interface QuantityInputProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

export function QuantityInput({ quantity, onIncrease, onDecrease }: QuantityInputProps) {
    return (
        <QuantityInputContainer>
            <Button size='medium' onClick={onDecrease} disabled={quantity <= 1}>
                <Minus size={13} weight="fill" />
            </Button>
            <pre>{quantity}</pre>
            <Button size='medium' onClick={onIncrease}>
                <Plus size={13} weight="fill" />
            </Button>
        </QuantityInputContainer>
    )
}