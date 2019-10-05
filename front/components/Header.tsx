import styled from "styled-components";


const Header = props => {
  
  return (
    <Wrapper> 
      Header
    </Wrapper>
  );
}


const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 35px;
  padding:10px;
  background-color: #88d134;
  color: #ffffff;
  text-align: center;
`

export default Header;
