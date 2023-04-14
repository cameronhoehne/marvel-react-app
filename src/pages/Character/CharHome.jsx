import React from 'react'
import styled from 'styled-components';
import {useNavigate} from "react-router-dom"
import CharacSearch from '../../components/Character/CharacSearch';
import charImage from "../Character/marvel-character.webp"
import { motion as m } from "framer-motion";

function CharHome() {

    const navigate = useNavigate();

const goHome = (e) => {
    e.preventDefault();
    navigate("/")
}

    return (
        <Container className='cover-image-characters'
        initial={{x: "-100%"}} 
        animate={{x: "0%"}}
        transition={{duration: .5}}
        exit={{x: "0%"}}
        style={{backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url(${charImage}`}}
        >
            <m.h1
            initial={{y: "100%"}} 
            animate={{y: "0%"}}
            transition={{duration: .75, delay: .2, ease: "anticipate", type: "spring"}}
            exit={{y: "0%"}}
            
            >CHARACTERS</m.h1>
            <m.p className='main-p'
            initial={{opacity: 0, y: "100%"}} 
            animate={{opacity: 1, y: "0%"}}
            transition={{duration: 1, delay: .3, ease: "anticipate", type: "spring"}}
            >Use the search bar below to look up your favorite characters in the Marvel universe</m.p>
            <CharacSearch/>
            <m.button onClick={goHome}
            whileHover={{
                scale: 1.1,
                transition: {
                    duration: .2,
                    ease: "easeInOut"
                }
            }}
            whileTap={{
                scale: 1.2
            }}
            >HOME</m.button>
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
justify-content: flex-start;
align-items: center;
height: 100%;
min-height: 100vh;
padding: 4rem;

    h1 {
        color: white;
        margin: 2rem 0rem 1.6rem 0rem;
        font-family: "Oswald", sans-serif;
        font-size: 6rem;
        border: 2px solid white;
        border-radius: 5px;
        padding: 1.2rem;
        background: rgba(0,0,0,.1);
    }
    button {
        padding: .8rem;
        margin: 1rem 0 2rem 0;
        font-family: "Oswald", sans-serif;
        font-size: 1.6rem;
        background: none;
        border: 1px solid white;
        border-radius: 10px;
        color: white;
        background: rgba(0,0,0,.1);

    }
    p {
        font-family: "Roboto", sans-serif;
        font-size: 1.4rem;
        color: white;
        max-width: 30rem;
        text-align: center;
    }
@media (max-width: 700px) {
    h1 {
        margin: 2rem 0rem 1.6rem 0rem;
        font-size: 3.8rem;
        border-radius: 5px;
        padding: 1.2rem;
    }
    button {
        padding: .8rem;
        margin: 1rem 0 2rem 0;
        font-size: 1.2rem;

    }
    p {
        font-size: 1.1rem;
        max-width: 30rem;
    }
}
@media (max-width: 375px) {
    h1 {
        font-size: 3rem;
    }
}
`

export default CharHome
