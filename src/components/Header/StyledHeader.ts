import styled from "styled-components"
import { colors } from "../../assets/cssVariables"

const StyledHeader = styled.header`
display: flex;
align-items: center;
justify-content: space-between;
background-color: ${colors.mainBrand};
color: ${colors.secondaryFont};
padding: 1rem;

nav {
    display: flex;
    gap: 1rem;
    padding: 0 0.5rem;
    font-weight: bold;
}
`
export default StyledHeader