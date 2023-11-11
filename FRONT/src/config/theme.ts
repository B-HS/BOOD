import { extendTheme } from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const hoverStyle = {
    _hover: {
        transform: 'scale(1.01)',
        opacity: 0.5,
        textDecoration: 'none',
    },
    _active: {
        opacity: 0.5,
    },
}

const fonts = {
    heading: '"M PLUS Rounded 1c", sans-serif',
    body: '"M PLUS Rounded 1c", sans-serif',
}

const components = {
    Link: {
        baseStyle: () => hoverStyle,
    },
    Button: {
        baseStyle: (props: StyleFunctionProps) => ({
            color: props.colorMode === 'dark' ? 'black' : 'white',
            ...hoverStyle,
        }),
    },
}
const styles = {
    global: (props: StyleFunctionProps) => ({
        body: {
            bg: props.colorMode === 'dark' ? 'black' : 'white',
        },
    }),
}

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const theme = extendTheme({
    fonts,
    components,
    styles,
    config,
})

export default theme
