import React from 'react'
import {FaBookOpen, FaUsers, FaPen, FaExclamation} from "react-icons/fa";
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion as m } from "framer-motion";



function Categories() {

  return (
    <List 
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1}}
        transition={{
            duration: .75,
            ease: "anticipate"
        }}
    >   <m.div
        whileHover={{
            scale: 1.1
        }}
        whileTap={{
            scale: 1.2
        }}
        >
        <StyledLink to={"/category/characters"}>
            <FaUsers/>
            <h4>Characters</h4>
        </StyledLink>
        </m.div>
        <m.div
        whileHover={{
            scale: 1.1
        }}
        whileTap={{
            scale: 1.2
        }}
        >
        <StyledLink to={"/category/comics"}>
            <FaBookOpen/>
            <h4>Comics</h4>
        </StyledLink>
        </m.div>
        <m.div
        whileHover={{
            scale: 1.1
        }}
        whileTap={{
            scale: 1.2
        }}
        >
        <StyledLink to={"/category/creators"}>
            <FaPen/>
            <h4>Creators</h4>
        </StyledLink>
        </m.div>
        <m.div
        whileHover={{
            scale: 1.1
        }}
        whileTap={{
            scale: 1.2
        }}
        >
        <StyledLink to={"/category/events"}>
            <FaExclamation/>
            <h4>Events</h4>
        </StyledLink>
        </m.div>

    </List>
  )
}

const List = styled(m.div)`
display: flex;
justify-content: center;

`

const StyledLink = styled(NavLink)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 50%;
margin-right: 2rem;
text-decoration: none;
cursor: pointer;

    svg {
        width: 4rem;
        height: 4rem;
        margin-bottom: .4rem;
        color: white;
    }
    h4 {
        font-size: 1.6rem;
        color: white;
    }
@media (max-width: 700px) {
margin: 1rem;
    svg {
        width: 2.4rem;
        height: 2.4rem;
        margin-bottom: .4rem;
        color: white;
    }
    h4 {
        font-size: 1rem;
    }
}
@media (max-width: 375px) {
    margin: 1rem;
    svg {
        width: 2rem;
        height: 2rem;
        margin-bottom: .4rem;
        color: white;
    }
    h4 {
        font-size: .8rem;
    }
}

`

export default Categories