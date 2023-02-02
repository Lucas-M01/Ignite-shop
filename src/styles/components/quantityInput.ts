import { styled } from ".."

export const QuantityInputContainer = styled('div', {
    background: '$gray800',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '0.5rem', 
    width: '7.5rem',
    padding: '0.25rem 0.5rem 0.5rem',
    height: '100%',

    pre: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        minWidth: '1.75rem',
        marginRight: '0.25rem',
        marginLeft: '0.25rem',
        border: 'none',
        color: '$white',
        paddingTop: '0.25rem',

        '&:focus': {
            outline: 'none'
        }
    }
})