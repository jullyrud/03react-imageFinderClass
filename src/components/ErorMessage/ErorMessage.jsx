import { StyledError } from './ErorMessage.styled'

export function ErorMessage({text, name}) {
    return (
        <StyledError>{ text } '{name}'  ;)</StyledError>
        )
}