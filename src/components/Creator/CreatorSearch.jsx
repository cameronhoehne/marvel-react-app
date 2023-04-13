import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion as m } from "framer-motion";

function CreatorSearch() {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        navigate("/category/creators/searched/" + input, {state: {location: "creators"}})
    }


  return (
    <Center>
    <m.form onSubmit={submitHandler}
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{
        delay: .5, duration: .75, ease: "anticipate"
    }}
    >
    <div>
        <m.input onChange={(e) => setInput(e.target.value)} type="text" value={input} placeholder="Search"
        whileFocus={{
            scale: 1.1
        }}
        />
    </div>
    </m.form>
    </Center>
  )
}

const Center = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: 2rem auto;
padding: 2rem auto;
    form {
        padding: 2rem 0rem;
    }
    input {
        padding: .5rem 1rem .5rem 1rem;
        border: none;
        border-radius: 15px;
        background: rgba(255, 255, 255, .96);
    }
@media (max-width: 700px) {
    padding: 1rem auto;
        form {
            padding: .4rem 0rem;
        }
    }


`

export default CreatorSearch;