import styled from "styled-components";

const StyledAvatarItemList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  align-items: stretch;
  gap: 0.5rem;
  background-color: #EFEFEF;
  font-size: 1.125rem;
  padding: 1rem;
  width: 100%;

  li {
    width: 100%;
  }
`;

export default StyledAvatarItemList;
