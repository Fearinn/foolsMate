import styled from "styled-components";
import { colors } from "../../assets/cssVariables";

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: ${colors.mainBrand};
    color: ${colors.secondaryFont};
    padding: 1rem;
    width: 100%;

    a {
        font-weight: bold;
        text-decoration: underline;
    }
`

export default StyledFooter