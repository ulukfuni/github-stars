import React from 'react'
import styled from 'styled-components'

const Flex = styled.div`
	display: flex;
	${props => (props.alignItems ? `align-items: ${props.alignItems};` : null )}
	${props => (props.justifyContent ? `justify-content: ${props.justifyContent};` : null )}
	${props => (props.flexDirection ? `flex-direction: ${props.flexDirection};` : null )}
	${props => (props.width ? `width: ${props.width};` : null )}
	${props => (props.height ? `height: ${props.height};` : null )}
	${props => (props.flexWrap ? `flex-wrap: ${props.flexWrap};` : null )}
`

export default props => <Flex {...props}>{props.children}</Flex>