import { styled } from '..'

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',
})

export const Header = styled('header', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto', 

    button: {
        background: '$gray800',
        border: 0,
        cursor: 'pointer',
        borderRadius: 6,
        padding: '0.75rem',
        
        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
        },

        span: {
            color: '$white',
            position: 'absolute',
            border: '3px solid $gray900',
            backgroundColor: '$green300',
            marginTop: '-1.5rem',
            marginLeft: '-0.35rem',
            padding: '0.45rem',
            borderRadius: '50%',
        },

        svg: {
            color: '$gray300',
        }
    }
})