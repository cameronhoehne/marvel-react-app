import {React, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CreatorSearch from '../../components/Creator/CreatorSearch';
import { useParams } from 'react-router-dom';
import { useNavigate, NavLink } from 'react-router-dom';
import image from "../../pages/channels4_profile.webp";
import { motion as m } from "framer-motion";

function CreatorSearchResults() {
    const [result, setResult] = useState([]);
    const [input, setInput] = useState("")
    const [data, setData] = useState(0)
    const [loading, setLoading] = useState(false)
    const count = useRef(3);
    let params = useParams();
    const navigate = useNavigate();
    let toggle = false;

    const getInfo = async (input, limit) => {
        setInput(input)
        setLoading(true);
        if (!toggle) {
            limit = 3;
        } else {
            limit = count.current;
        }
        const pubKey = "ed5ab77a92193e392b2c6d457caebe33";
        const privKey = "eba5c3e16ba2f578aee42be8c10e8c57";
        const ts = 1;
        const url = "https://gateway.marvel.com:443/v1/public/creators"
    try {
        if (isNaN(input) === true) {
        const api = await fetch(`${url}?ts=${ts}&apikey=${pubKey}&hash=${privKey}&nameStartsWith=${input}&limit=${limit}`)
        const data = await api.json();
        if (!toggle) {
            setResult(data.data.results)
            setData(data.data.total)
            setLoading(false);
        } else if (toggle) {
            data.data.results.splice(0, limit - 3)
            setResult([...result, ...data.data.results])
            setLoading(false);
            toggle = false;
        }

        if (data.data.results.length <= 0) {
            navigate("/noresults", { state: {location: "creators"}})
        }
    }
        if ((isNaN(input) === false)) {
        const api = await fetch(`${url}/${input}?ts=${ts}&apikey=${pubKey}&hash=${privKey}`)
        const data = await api.json();
        setResult(data.data.results)
        setLoading(false);
       
        }
    } catch (error) {
        alert(error)
        navigate("/category/creators")
    }
 }

useEffect(() => {
    getInfo(params.search);
}, [params.search]);

const Image = (props) => {
    const {index} = props;
    if (result[index].thumbnail?.path.includes("image_not_available")) {
        return <img className="default-image" src={image} />
    } else {
       return <img  className="good-image" src={`${result[index].thumbnail.path}.${result[index].thumbnail.extension}`}/>
    }
}

const goHome = (e) => {
    e.preventDefault();
    setInput("")
    navigate("/")
}

const Description = (props) => {
    const {desc} = props;
    if (desc) {
        const clean = lineBreaks(desc);
        return (
            <p>{clean}</p>
        )
    } else {
        return (
            <p>No description available.</p>
        )
    }
}

const lineBreaks = (json) => {
        let cleanedJSON = json.replaceAll("<br>" || "</br>", "\n");
        return cleanedJSON;
}

const captureId = (event, id) => {
    event.preventDefault();
    window.scrollTo(0, 0)
    navigate("/category/creators/searched/" + id)
}

const moreResults = () => {
    count.current += 3
    toggle = true;
    getInfo(input);
}

const sendId = (input, type) => {
    if (type === "comics") {
        window.scrollTo(0, 0)
    navigate("/category/comics/searched/" + input)
    } else if (type === "characters") {
        window.scrollTo(0, 0)
        navigate("/category/characters/searched/" + input)
    } else if (type === "creators") {
        window.scrollTo(0, 0)
        navigate("/category/creators/searched/" + input)
    } else if (type === "events") {
        window.scrollTo(0, 0)
        navigate("/category/events/searched/" + input)
    }
}

const extractId = (link, type) => {
    const urlBase = "http://gateway.marvel.com/v1/public/"
    if (type === "comics") {
    const cleanLink = link.replace(urlBase + "comics/", "")
    return sendId(cleanLink, "comics"); 
} else if (type === "characters") {
    const cleanLink = link.replace(urlBase + "characters/", "")
    return sendId(cleanLink, "characters"); 
} else if (type === "creators") {
    const cleanLink = link.replace(urlBase + "creators/", "")
    return sendId(cleanLink, "creators");
} else if (type === "events") {
    const cleanLink = link.replace(urlBase + "events/", "")
    return sendId(cleanLink, "events");
}
}

const Loading = () => {
    return (
        <div>
            <h2>Loading...</h2>
        </div>
    )
}

const SingleResult = () => {
    return (
            <m.div
            initial={{opacity: 0, y: "300px"}}
            animate={{opacity: 1, y: "0px"}}
            transition={{delay: .1, duration: .75, type: "spring", ease: "anticipate"}}
            >
            <CardContainer>
            <InfoCard>
            <h2>{result[0].fullName}</h2>
            <Image index={0} />
            <Description desc={result[0].description}/>
            </InfoCard> 
            </CardContainer>
            </m.div>
    )
}

const Events = () => {
    return (
        <InfoCard
        initial={{opacity: 0, y: "100%"}}
        animate={{opacity: 1, y: "0%"}}
        transition={{delay: .1, duration: .75, type: "spring", ease: "anticipate"}}
        >
            <h2>Events</h2>
             <ul>
                {result[0].events.items.map((event, idx) => {
                    return (<m.li key={idx}
                            whileHover={{
                                scale: 1.1
                            }}
                            whileTap={{
                                scale: 1.18
                            }}
                            >
                            <a onClick={(e) => extractId(event.resourceURI, "events")} >{event.name}</a>
                            </m.li>)
                })}
             </ul>
             </InfoCard>
            
    )
}

const Comics = () => {
    return (<InfoCard
        initial={{opacity: 0, y: "100%"}}
        animate={{opacity: 1, y: "0%"}}
        transition={{delay: .1, duration: .75, type: "spring", ease: "anticipate"}}
        >
        <h2>Comics</h2>
         <ul>
            {result[0].comics.items.map((comic, idx) => {
                return (<m.li key={idx}
                        whileHover={{
                            scale: 1.1
                        }}
                        whileTap={{
                            scale: 1.18
                        }}
                        >
                        <a onClick={(e) => extractId(comic.resourceURI, "comics")} >{comic.name}</a>
                        </m.li>)
            })}
         </ul>
         </InfoCard>)
}


  return (
    

    <Container className='cover-image-creators'
    initial={{x: "100%"}} 
    animate={{x: "0%"}}
    transition={{duration: .5}}
    exit={{x: "0%"}}
    >
        <m.h1
        initial={{y: "100%"}} 
        animate={{y: "0%"}}
        transition={{duration: .75, delay: .2, ease: "anticipate", type: "spring"}}
        >CREATORS</m.h1>
        <m.p className='main-p'
        initial={{opacity: 0, y: "100%"}} 
        animate={{opacity: 1, y: "0%"}}
        transition={{duration: 1, delay: .3, ease: "anticipate", type: "spring"}}
        >Use the search bar below to discover the creators of Marvel</m.p>
        <CreatorSearch />
        {(loading) ? (<Loading/>) : (null)}
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
        {result.length > 0 && result.length < 2 ?
            (<div>
                <SingleResult/>
                <CardGrid>
                {result[0].comics.items.length > 0 ? 
                (<Comics/>
                )  :
                (<div></div>)}
                {result[0].events.items.length > 0 ? 
                (<Events/>
                )  :
                (<div></div>)}
                </CardGrid>

            </div>) :
        
        <Grid>
        {(result.map((item, idx) => {
            return (
                <m.div key={item.id}
                initial={{opacity: 0, y: "100%"}}
                animate={{opacity: 1, y: "0%"}}
                transition={{delay: .1, duration: .75, type: "spring", ease: "anticipate"}}
                >
                <SLink onClick={(e) => captureId(e, item.id)}>
                <Card
                whileHover={{
                    scale: 1.08,
                    transition: {
                      duration: .15
                    }
                   }}
                   whileTap={{
                    scale: 1.2
                   }}
                  transition={{ type: "spring", stiffness: 200, damping: 20}}
                >
                <h2>{item.fullName}</h2>
                <Image index={idx} />
                </Card>
                </SLink>
                </m.div>
            )
        }))}
        </Grid>
        }
        {result.length > 1 && data > 3 && result.length < data ? (
             <m.button onClick={() => {moreResults()}}
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
             >MORE RESULTS</m.button>
        ) : (<div></div>)}
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
        background: rgba(0,0,0,.3);

    }
    p {
        font-family: "Roboto", sans-serif;
        font-size: 1.4rem;
        color: white;
        max-width: 30rem;
        text-align: center;
    }
    h2 {
        color: white;
        font-size: 2rem;
        font-family: "Roboto", sans-serif;
        margin: 1.6rem 2rem 2.6rem 2rem;
        border: 2px solid white;
        padding: 1.2rem;
        border-radius: 5px;
        background: rgba(0,0,0,.1);
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

const CardContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: stretch;
`

const SLink = styled(NavLink)`
text-decoration: none;
`

const CardGrid = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: stretch;
flex-wrap: wrap;
    

`

const Grid = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: stretch;
flex-wrap: wrap;
`

const Card = styled(m.div)`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 30rem;
height: auto;
background: linear-gradient(171deg, rgba(166,43,29,0.9080225840336135) 60%, rgba(31,28,24,0.9080225840336135) 91%);
border-radius: 20px;
margin: .8rem 2rem 0 2rem;

    h2 {
        color: white;
        font-size: 2rem;
        font-family: "Roboto", sans-serif;
        margin: 1.6rem 2rem 2.6rem 2rem;
        border: 2px solid white;
        padding: 1.2rem;
        border-radius: 5px;
        background: rgba(0,0,0,.1);
        text-align: center;
    }
    p {
        max-width: 20rem;
        white-space: pre-line;
        color: white;
        font-size: 1.1rem;
        font-family: "Roboto", sans-serif;
        margin: 1rem 0rem 1rem 0rem;
    }
    li {
        list-style: none;
    }
    a {
        cursor: pointer;
        text-decoration: none;
    }
    img {
        border-radius: 15px;
        margin-bottom: 3rem;
    }
@media (max-width: 700px) {
width: 20rem;
margin-bottom: 1.5rem;
    h2 {
        font-size: 1.6rem;
        margin: 1.6rem 2rem 2.6rem 2rem;
        padding: 1.2rem;
        border-radius: 5px;
    }
    p { 
        display: none;
        max-width: 14rem;
        font-size: 1.1rem;
        margin: 1rem 0rem 1rem 0rem;
    }
    img {
        border-radius: 15px;
        max-width: 14rem;
    }
}

`

const InfoCard = styled(m.div)`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: content;
height: auto;
background: linear-gradient(171deg, rgba(166,43,29,0.9080225840336135) 60%, rgba(31,28,24,0.9080225840336135) 91%);
border-radius: 20px;
margin: .8rem 2rem 0 2rem;
padding: 2rem;
text-align: center;

    h2 {
        color: white;
        font-size: 2.3rem;
        font-family: "Roboto", sans-serif;
        margin: 1.6rem 2rem 2.6rem 2rem;
        border: 2px solid white;
        padding: 1.2rem;
        border-radius: 5px;
        background: rgba(0,0,0,.1);
    }
    li {
        list-style: none;
    }
    a {
        cursor: pointer;
        text-decoration: none;
        color: white;
        max-width: 20rem;
        white-space: pre-line;
        font-size: 1.1rem;
        font-family: "Roboto", sans-serif;
        margin: 1rem 0rem 1rem 0rem;
    }
    img {
        border-radius: 15px;
    }
@media (max-width: 700px) {
width: 20rem;
margin-bottom: 1.5rem;
    h2 {
        font-size: 1.6rem;
        margin: 1.6rem 2rem 2.6rem 2rem;
        padding: 1.2rem;
        border-radius: 5px;
    }
    p {
        max-width: 14rem;
        font-size: 1.1rem;
        margin: 1rem 0rem 1rem 0rem;
    }
    img {
        border-radius: 15px;
        max-width: 14rem;
    }
    a {
        max-width: 20rem;
        font-size: 1.2rem;
        margin: 1rem 0rem 1rem 0rem;
    }
    li {
        padding-bottom: .6rem;
    }
}
@media (max-width: 375px) {
    a {
        max-width: 20rem;
        font-size: 1rem;
        margin: 1rem 0rem 1rem 0rem;
    }
}
`


export default CreatorSearchResults;


