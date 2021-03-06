import { Component } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Footer from "../components/Footer";


class IndexPage extends Component {
  render() {
    return (
      <Wrapper> 
        <Header />
        Index page.
        <br />
        ENV: {process.env.ENV}
        <Footer />
      </Wrapper>
    ); 
  }
}

const Wrapper = styled.div`
  margin: 20px;
  padding: 50px 10px 50px 10px;
  width: 100%;
  overflow: auto;
`

export default IndexPage;
