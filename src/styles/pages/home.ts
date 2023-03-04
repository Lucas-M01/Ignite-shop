import { styled } from "..";

export const HomeContainer = styled('main', {
    display: 'flex',
    variants: {
        size: {
            default: {     
                maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
                marginLeft: 'auto',
            },
            left: {
                transform: 'translate()',
            }
        }
    }
})

export const Product = styled('div', {
    background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',

    display: 'flex',
    alignItems:  'center',
    justifyContent:     'center',

    img: {
        objectFit: 'cover',
    },

    footer: {
        position: 'absolute',
        bottom: '0.25rem',
        left: '0.25rem',
        right: '0.25rem',
        padding: '2rem',

        borderRadius: 6,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: 'rgba(0, 0, 0, 0.6)',

        transform: 'translateY(110%)',
        opacity: 0,
        transition: 'all 0.2s ease-in-out',

        div: {
            display: 'flex',
            flexDirection: 'column',

            strong: {
                color: '$gray100',
                fontSize: '$lg',
            },
    
            span: {
                fontSize: '$xl',
                fontWeight: 'bold',
                color: '$green300'
            }
        },

        button: {
            border: 0,
            backgroundColor: '$green300',
            transition: '0.2s',
            padding: '1rem',
            borderRadius: 6,
            cursor: 'pointer',

            svg: {
                color: '$white',
            },

            '&:hover': {
                backgroundColor: '$green500',
            }
        }
    },

    '&:hover': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1,
        }
    }
})

export const ArrowContainer = styled('div', {
    width: '8.5rem',
    height: '100vh',
    position: 'absolute',
    zIndex: 1,
    background: 'linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',

    button: {
        background: 'transparent',
        border: 0,
        position: 'absolute',
        cursor: 'pointer',

        '&:disabled': {
            opacity: 0
        },
        
        svg: {
            color: '$gray300',
        }
    },
    
    variants: {
        arrow: {
            left: {
                transform: 'matrix(-1, 0, 0, 1, 0, 0)',
                button: {
                    left: 0,
                    top: '50%',
                    transform: 'matrix(-1, 0, 0, 1, 0, 0)',
                }
            },
            right: {
                right: 0,
                button: {
                    top: '50%',
                    
                    right: 0,
                }
            }
        }
    }
})