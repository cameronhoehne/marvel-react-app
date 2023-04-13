import {React} from 'react'
import styled from 'styled-components';
import GetRandoms from '../components/GetRandoms';
import Categories from '../components/Categories';
import CharacSearch from '../components/Character/CharacSearch';
import image from "../pages/marvel-main.webp"
import Footer from '../components/Footer';
import { motion as m } from "framer-motion";

function Home() {

  return (
    <Container className='cover-image-main' 
    initial={{x: "100%"}} 
    animate={{x: "0%"}}
    transition={{duration: .5}}
    exit={{x: "0%"}}
    style={{backgroundImage: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.3)), url(${image})`}}
    
    >
        <Header>
        <m.h1
        initial={{opacity: 0, y: "-100px"}}
        animate={{opacity: 1, y: "0px"}}
        transition={{delay: .5, duration: .5, type: "spring"}}
        >MARVEL REACT APP</m.h1>
        <Categories/>
        </Header>
        <m.h2
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{
            delay: .5, duration: .75, ease: "anticipate"
          }}
        >Use the search bar below to find your favorite heroes</m.h2>
        <CharacSearch/>
        <GetRandoms/>
        <Footer/>
    </Container>
  )
}

const Container = styled(m.div)`
position: absolute;
top: 0;
left: 0;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
min-height: 100vh;
    h2 {
      font-family: "Roboto", sans-serif;
      color: white;
      font-size: 2rem;
      text-shadow: -1px 1px 4px rgba(0, 0, 0, 0.8);
      max-width: 40rem;
      text-align: center;
    }
@media (max-width: 700px) {
      h2 {
        margin-top: .6rem;
        font-size: 1.2rem;
        max-width: 20rem;
      }
}
@media (max-width: 375px) {
      h2 {
        margin-top: .6rem;
        font-size: 1rem;
        max-width: 20rem;
      }
}
`

const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
padding: 2rem 2rem 1rem 2rem;
width: 100%;
    h1 {
      color: white;
      margin: 2rem 0rem 1.6rem 0rem;
      font-family: "Oswald", sans-serif;
      font-size: 4rem;
      border: 2px solid white;
      border-radius: 5px;
      padding: 1.2rem;
      background: rgba(0,0,0,.3);
    }
@media (max-width: 700px) {
flex-direction: column;

      h1 {
        margin: 2rem 0rem 1.6rem 0rem;
        font-size: 2.4rem;
        padding: 1rem;
        background: rgba(0,0,0,.3);
      }

}
@media (max-width: 375px) {
  h1 {
    margin: 2rem 0rem 1.6rem 0rem;
    font-size: 2rem;
    padding: 1rem;
    background: rgba(0,0,0,.3);
  }
}
`

export default Home
