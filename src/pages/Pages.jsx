import React from 'react'
import Home from './Home'
import ComicHome from './Comics/ComicHome';
import { Route, Routes, useLocation } from 'react-router-dom';
import NoResults from './NoResults';
import CharSearchResults from './Character/CharSearchResults';
import ComicSearchedResults from './Comics/ComicSearchedResults';
import CreatorHome from './Creator/CreatorHome';
import CharHome from './Character/CharHome';
import CreatorSearchResults from './Creator/CreatorSearchResults';
import EventHome from './Event/EventHome';
import EventSearchResults from './Event/EventSearchResults';
import { AnimatePresence } from "framer-motion";

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home  />}/>
        <Route path="/category/characters" element={<CharHome />}/>
        <Route path="/category/comics" element={<ComicHome  />}/>
        <Route path="/category/creators" element={<CreatorHome />}/>
        <Route path="/category/events" element={<EventHome />}/>
        <Route path="/category/characters/searched/:search" element={<CharSearchResults />}/>
        <Route path="/category/comics/searched/:search" element={<ComicSearchedResults />}/>
        <Route path="/category/creators/searched/:search" element={<CreatorSearchResults />}/>
        <Route path="/category/events/searched/:search" element={<EventSearchResults />}/>
        <Route path="/noresults" element={<NoResults />}/>
    </Routes>
    </AnimatePresence>
  )
}

export default Pages