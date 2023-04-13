import {React, useState, useEffect} from 'react'
import marvel from 'marvel-characters';
import image from "../pages/channels4_profile.webp";
import styled from 'styled-components';
import {NavLink, useNavigate} from "react-router-dom"
import { motion as m } from "framer-motion";

function Fetch() {
    //useStates
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(true);
    //
    const navigate = useNavigate();
    let arr2 = [];

    const range = marvel.characters.length;
    const selector = marvel.characters;
    let random = [(Math.floor(Math.random() * range)), (Math.floor(Math.random() * range)), (Math.floor(Math.random() * range)), (Math.floor(Math.random() * range))]
    const randomChars = [selector[random[0]], selector[random[1]], selector[random[2]], selector[random[3]]]

    const getRandoms = async (randomChars) => {
      setLoading(true)
        const pubKey = process.env.REACT_APP_PUB_KEY;
        const privKey = process.env.REACT_APP_PRIV_KEY;
        const ts = 1;
        const url = "https://gateway.marvel.com:443/v1/public/characters"
        let arr = [];

        let resultPromises = randomChars.map(async (char, idx) => {
          let foundId = false;
          let tries = 0;
          let check = localStorage.getItem(`result${idx}`)

          if (check) {
            setResult(JSON.parse(check))
          } else {

            while (!foundId && tries < 10) {
              const call = await fetch(`${url}?ts=${ts}&apikey=${pubKey}&hash=${privKey}&name=${char}`);
              const random = await call.json();
              
            if (random.data.results.length > 0) {
              localStorage.setItem(`result${idx}`, JSON.stringify(random.data.results[0]))
              arr.push(random)
              foundId = true;
            } else {
              tries++;
              let randomCH = (Math.floor(Math.random() * range));
              char = selector[randomCH]
            }
          }
        }
      }
    )

      await Promise.all(resultPromises).then(() => {
        setResult(arr);
        setLoading(false)
        })
        .catch ((error) => {
          alert(error)
        })
    }
    useEffect(() =>  {
        getRandoms(randomChars);
    }, [])
    const getStorage = () => {
      for (let i = 0; i < 4; i++) {
        let strData = localStorage.getItem(`result${i}`);
        let objData = JSON.parse(strData);
        arr2.push(objData) 
      }
      return arr2;
    }

    const captureId = (event, id) => {
      event.preventDefault();
      // navigate("/searched/" + id, { state: {location: "characters"}})
      navigate("/category/characters/searched/" + id)
  }

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    const Image = (props) => {
      const {index} = props;
      if (arr2[index].thumbnail?.path.includes("image_not_available")) {
          return <img className="default-image" src={image} />
      } else {
         return <img  className="good-image" src={`${arr2[index].thumbnail.path}.${arr2[index].thumbnail.extension}`}/>
      }
  }

console.log(result)
const resultKeys = ["result0", "result1", "result2", "result3"]
if (resultKeys.every((key) => localStorage.getItem(key) !== null)) {
  getStorage();
  console.log(arr2)

  return (
    <div>        
 <Container
 initial={{y: "200px", opacity: 0}} 
 animate={{y: "0px", opacity: 1}}
 transition={{delay: .5, type: "spring", duration: .5, ease: "anticipate"}}
 exit={{y: "200px", opacity: 0}}>
  {arr2.map((item, idx) => {
    return (
      <SLink onClick={(e) => captureId(e, item.id)}>
      <Card id={item.id} key={item.id}
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
        <h3>{item.name}</h3>
        <Image index={idx} />
        <p>{item.description}</p>
    </Card>
    </SLink>
    )
  })}

 </Container>
</div>
      
  )
 } else {
    return (
      <div>
        {result.map((item) => {
          console.log(item)
         return (
          <div>
            <h3>{item.data.results[0].name}</h3>
          </div>
         )
        })}
      </div>
    )
  }
}

const Container = styled(m.div)`
display: flex;
flex-direction: row;
justify-content: center;
align-item: center;
@media (max-width: 700px) {
  display: none;
}
`

const Card = styled(m.div)`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 24rem;
height: auto;
background: linear-gradient(171deg, rgba(166,43,29,0.9080225840336135) 60%, rgba(31,28,24,0.9080225840336135) 91%);
border-radius: 20px;
margin: .8rem 2rem 0 2rem;

    h3 {
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
    }

@media (max-width: 700px) {
width: 10rem;
height: auto;
background: linear-gradient(171deg, rgba(166,43,29,0.9080225840336135) 60%, rgba(31,28,24,0.9080225840336135) 91%);
border-radius: 20px;
margin: .8rem 2rem 0 2rem;

    h3 {
        font-size: 1rem;
        margin: 1.6rem 2rem 2.6rem 2rem;
        border: 2px solid white;
        padding: .4rem;
    }
    p {
        max-width: 20rem;
        font-size: 1.1rem;
        font-family: "Roboto", sans-serif;
        margin: 1rem 0rem 1rem 0rem;
    }
    img {
        border-radius: 15px;
        width: 6rem;
        height: 6rem;
    }
}

`

const SLink = styled(NavLink)`
text-decoration: none;
`

export default Fetch




















// import {React, useState, useEffect} from 'react'
// import marvel from 'marvel-characters';
// import image from "../pages/channels4_profile.jpg";
// import styled from 'styled-components';
// import {NavLink, useNavigate} from "react-router-dom"

// function GetRandoms() {
// //REFACTOR this later so that we're not writing the same code four times
//     const [result1, setResult1] = useState([]);
//     const [result2, setResult2] = useState([]);
//     const [result3, setResult3] = useState([]);
//     const [result4, setResult4] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     const range = marvel.characters.length;
//     const selector = marvel.characters;
//     let random = [(Math.floor(Math.random() * range)), (Math.floor(Math.random() * range)), (Math.floor(Math.random() * range)), (Math.floor(Math.random() * range))]
//     const randomChars = [selector[random[0]], selector[random[1]], selector[random[2]], selector[random[3]]]
  

//     const getRandoms = async () => {
//         setLoading(true)
//         const pubKey = "ed5ab77a92193e392b2c6d457caebe33";
//         const privKey = "eba5c3e16ba2f578aee42be8c10e8c57";
//         const ts = 1;
//         const url = "https://gateway.marvel.com:443/v1/public/characters"
//         let foundId = false;
//         let tries = 0;

//         const check1 = localStorage.getItem("result1");
//         const check2 = localStorage.getItem("result2");
//         const check3 = localStorage.getItem("result3");
//         const check4 = localStorage.getItem("result4");
//         if (check1 && check2 && check3 && check4) {
//             setResult1(JSON.parse(check1))
//             setResult2(JSON.parse(check2))
//             setResult3(JSON.parse(check3))
//             setResult4(JSON.parse(check4))
//             setLoading(false)
//         } else {

//         while (!foundId && tries < 10) {
//         const call1 = await fetch(`${url}?ts=${ts}&apikey=${pubKey}&hash=${privKey}&name=${randomChars[0]}`)
//         const call2 = await fetch(`${url}?ts=${ts}&apikey=${pubKey}&hash=${privKey}&name=${randomChars[1]}`)
//         const call3 = await fetch(`${url}?ts=${ts}&apikey=${pubKey}&hash=${privKey}&name=${randomChars[2]}`)
//         const call4 = await fetch(`${url}?ts=${ts}&apikey=${pubKey}&hash=${privKey}&name=${randomChars[3]}`)
//         const random1 = await call1.json();
//         const random2 = await call2.json();
//         const random3 = await call3.json();
//         const random4 = await call4.json();

//         if (random1.data.results.length > 0 && random2.data.results.length > 0) {
//             localStorage.setItem("result1", JSON.stringify(random1.data.results[0]));
//             setResult1(random1.data.results[0]);
//             localStorage.setItem("result2", JSON.stringify(random2.data.results[0]));
//             setResult2(random2.data.results[0]);
//             localStorage.setItem("result3", JSON.stringify(random3.data.results[0]));
//             setResult3(random3.data.results[0]);
//             localStorage.setItem("result4", JSON.stringify(random4.data.results[0]));
//             setResult4(random4.data.results[0]);
//             foundId = true;
//         } else {
//             tries++;
//             random = [(Math.floor(Math.random() * range)), (Math.floor(Math.random() * range)), (Math.floor(Math.random() * range)), (Math.floor(Math.random() * range))];
//             randomChars[0] = selector[random[0]];
//             randomChars[1] = selector[random[1]];
//             randomChars[2] = selector[random[2]];
//             randomChars[3] = selector[random[3]];
//         }
//         setLoading(false)
//      }}
//     }

//     useEffect(() => {
//         getRandoms();
//     }, []);

//     if (loading) {
//         return (
//             <div>Loading...</div>
//         )
//     }

// const Image1 = () => {
//         if (result1.thumbnail?.path.includes("image_not_available")) {
//             return <img className="default-image" src={image} />
//         } else {
//            return <img  className="good-image" src={`${result1.thumbnail?.path}.${result1.thumbnail?.extension}`}/>
//         }
// }

// const Image2 = () => {
//     if (result2.thumbnail?.path.includes("image_not_available")) {
//         return <img className="default-image" src={image} />
//     } else {
//         return <img className="good-image" src={`${result2.thumbnail?.path}.${result2.thumbnail?.extension}`}/>
//     }
// }
// const Image3 = () => {
//     if (result3.thumbnail?.path.includes("image_not_available")) {
//         return <img className="default-image" src={image} />
//     } else {
//         return <img className="good-image" src={`${result3.thumbnail?.path}.${result3.thumbnail?.extension}`}/>
//     }
// }
// const Image4 = () => {
//     if (result4.thumbnail?.path.includes("image_not_available")) {
//         return <img className="default-image" src={image} />
//     } else {
//         return <img className="good-image" src={`${result4.thumbnail?.path}.${result4.thumbnail?.extension}`}/>
//     }
// }

// const captureId = (event, id) => {
//     event.preventDefault();
//     navigate("/searched/" + id)
// }


//   return (
// <div>        
//  <Test>
//     <Card id={result1.id}>
//         <h2>{result1.name}</h2>
//         <NavLink onClick={(e) => captureId(e, result1.id)}>
//         <Image1/>
//         </NavLink>
//         <p>{result1.description}</p>
//     </Card>
//     <Card id={result2.id}>
//         <h2>{result2.name}</h2>
//         <NavLink onClick={(e) => captureId(e, result2.id)}>
//         <Image2/>
//         </NavLink>
//         <p>{result2.description}</p>
//     </Card>
//     <Card id={result3.id}>
//         <h2>{result3.name}</h2>
//         <NavLink onClick={(e) => captureId(e, result3.id)}>
//         <Image3/>
//         </NavLink>
//         <p>{result3.description}</p>
//     </Card>
//     <Card id={result4.id}>
//         <h2>{result4.name}</h2>
//         <NavLink onClick={(e) => captureId(e, result4.id)}>
//         <Image4/>
//         </NavLink>
//         <p>{result4.description}</p>
//     </Card>
//  </Test>
// </div>
//   )
// }

// const Test = styled.div`
// display: grid;
// grid-template-columns: repeat(4, 1fr);
// grid-auto-rows: 1fr;
// grid-gap: 2rem;

// `

// const Card = styled.div`
// display: flex;
// justify-content: flex-start;
// align-items: center;
// flex-direction: column;
// flex-basis: 50%;
// padding: 2rem;
//     p {
//     max-width: 50%;
//     }

// `

// export default GetRandoms
