import { styled } from "..";

export const ProductContainer = styled('main', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'stretch',
    gap: '4rem',

    maxWidth: 1180,
    margin: '0 auto',
})

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 576,
    height: 'calc(656px - 5.5rem)',
    background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover'
    }
})

export const ProductDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    h1: {
        fontSize: '$2xl',
        color: '$gray300',
    },

    span: {
        marginTop: '1rem',
        display: 'block',
        fontSize: '$2xl',
        color: '$green300',
    },

    p: {
        marginTop: '2.5rem',
        fontSize: '$md',
        lineHeight: 1.6,
        color: '$gray300'
    },

    section: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '2rem',
        fontSize: '$md',
        gap: '1rem',
        height: '2rem',
    },

 
})

export const Button = styled('button', {
    variants: {
        size: {
            large: {
                marginTop: 'auto',
                backgroundColor: '$green500',
                border: 0,
                color: '$white',
                borderRadius: 8,
                padding: '1.25rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '$md',
            
                '&:disabled': {
                    opacity: 0.6,
                    cursor: 'not-allowed',
                },
            
                '&:not(:disabled):hover': {
                    backgroundColor: '$green300'
                }
            },

            medium: {
                width: '100%',
                height: '0.25rem',
                border: 'none',
                background: 'none',
                textAlign: 'center',
                color: '$white',
                transition: '0.1s',
                cursor: 'pointer',

                svg: {
                    color: '$white',
                },
                
                '&:disabled': {
                    opacity: '0.4',
                    cursor: 'default',
                },

                '&:hover': {
                    color: '$green500',
                }
            }
        }
    }

})

export const LoadingContainer = styled('div', {
    maxHeight: '100vh',
    width: '100vw',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})