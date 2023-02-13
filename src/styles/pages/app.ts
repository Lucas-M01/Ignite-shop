import { styled } from '..'
import Modal from 'react-modal';

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
            minWidth: '1rem',
        },

        svg: {
            color: '$gray300',
        }
    }
})

export const StyledModal = styled(Modal, {
    height: '100vh',
    position: 'fixed',
    zIndex: '40',
    width: "30%",
    backgroundColor: '$gray800',
    top: 0,
    right: 0,
    bottom: 0,
    boxShadow: '-4px 0px 30px 0px #000000CC',

    '&:overlay-modal': {
        position: 'fixed',
        width: "70%",
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'red',
    }
})

export const OverlayModal = {
    overlay: {

        position: 'fixed',
            width: "70%",
            top: 0,
            left: 0,
            bottom: 0,
            backgroundColor: 'red',
    }
}