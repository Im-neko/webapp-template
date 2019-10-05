import styled from "styled-components";

const Footer = props => {
  return (
    <Wrapper> Footer </Wrapper>
  );
}

const Wrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 35px;
  padding:10px;
  background-color: #88d134;
  color: #ffffff;
  text-align: center;
`

export default Footer;
