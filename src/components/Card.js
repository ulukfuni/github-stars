import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
	box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
	${props => (props.m ? `margin: ${props.m};` : null )}
	${props => (props.p ? `padding: ${props.p};` : null )}
	${props => (props.cursor ? `cursor: ${props.cursor};` : null )}
	${props => (props.width ? `width: ${props.width};` : null )}
`

export default props => {
	return (
		<Card {...props}>
			{props.children}
		</Card>
	)
}