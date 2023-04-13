import React from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import styled from 'styled-components';
import {motion as m} from "framer-motion";

function NoResults() {

const {state} = useLocation();
const {location} = state;


    const goHome = (e) => {
        e.preventDefault();
        navigate(`/category/${location}`)
    }
    const navigate = useNavigate();



  return (
    <Container className='cover-image-no-results'
    initial={{x: "-100%"}} 
    animate={{x: "0%"}}
    transition={{duration: .5}}
    exit={{x: "100%"}}
    
    >
        <h1>NO RESULTS!</h1>
        <p>Use the button below to go back and make another search</p>
        <button onClick={goHome}>BACK</button>
    </Container>
  )
}

const Container = styled(m.div) `
position: absolute;
top: 0;
left: 0;
width: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
min-height: 100vh;
padding: 4rem;
z-index: 999;
h1 {
    color: white;
    margin: 6rem 0rem 3rem 0rem;
    font-family: "Oswald", sans-serif;
    font-size: 6rem;
    text-align: center;
    border: 2px solid white;
    border-radius: 5px;
    padding: 1.2rem;
    background: rgba(0,0,0,.3);
}
button {
    padding: .8rem;
    margin: 1rem 0 2rem 0;
    font-family: "Oswald", sans-serif;
    font-size: 1.6rem;
    border: 1px solid white;
    border-radius: 10px;
    color: white;
    background: rgba(0,0,0,.3);

}
p {
    font-family: "Roboto", sans-serif;
    font-size: 1.4rem;
    color: white;
    max-width: 30rem;
    text-align: center;
    margin-bottom: 4rem;
}
@media (max-width: 700px) {
    h1 {
        margin: 6rem 0rem 3rem 0rem;
        font-size: 3.8rem;
        padding: 1.2rem;
    }
    button {
        padding: .8rem;
        margin: 1rem 0 2rem 0;
        font-size: 1.2rem;
    
    }
    p {
        font-size: 1.4rem;
        max-width: 30rem;
        margin-bottom: 4rem;
    } 
}
@media (max-width: 375px) {
    h1 {
        font-size: 2.6rem;
    }
}


`

export default NoResults