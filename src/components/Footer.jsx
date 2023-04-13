import React from 'react'
import styled from 'styled-components'

function Footer() {
  return (
    <FooterDiv>
        <h3>Copyright, Cameron Hoehne</h3>
    </FooterDiv>
  )
}

const FooterDiv = styled.div`
background-color: darkgray;
height: 4rem;
position: absolute;
left: 0;
bottom: 0;
right: 0;
background: rgba(0, 0, 0, .4);
    h3 {
        margin-top: 1rem;
        padding-left: .6rem;
        font-size: 1rem;
        color: rgba(255,255,255, .8);
    }
@media (max-width: 700px) {
  height: 3rem;
}

`


export default Footer