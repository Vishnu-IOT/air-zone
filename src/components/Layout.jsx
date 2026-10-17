import {useState,useEffect} from 'react';import {NavLink,Link,useLocation} from 'react-router-dom';
import {Menu,X} from 'lucide-react';import {AnimatePresence,motion} from 'framer-motion';import cfg from '../data/siteConfig.js';import {services} from '../data/services.js';
const links=[['/','Home'],['/about','About'],['/services','Services'],['/gallery','Gallery'],['/contact','Contact']];
export function Navbar(){const [s,setS]=useState(false),[o,setO]=useState(false);const {pathname}=useLocation();
 useEffect(()=>{const f=()=>setS(scrollY>20);f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
 useEffect(()=>{setO(false);scrollTo(0,0)},[pathname]);
 return <header className={'nav'+(s?' scrolled':'')}><div className="nav-in container">
  <Link to="/" className="brand" aria-label="Air Zone Automobile home"><img src="/images/logo.png" alt="Air Zone Automobile"/></Link>
  <nav className="nav-links" aria-label="Primary">{links.map(([t,l])=><NavLink key={t} to={t} end={t==='/'}>{l}</NavLink>)}</nav>
  <Link className="btn btn-sm nav-cta" to="/book-a-quote">Book a Quote</Link>
  <button className="burger" aria-label={o?'Close menu':'Open menu'} aria-expanded={o} onClick={()=>setO(!o)}>{o?<X/>:<Menu/>}</button></div>
  <AnimatePresence>{o&&<motion.div className="mobile-menu" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
   {links.map(([t,l])=><NavLink key={t} to={t} end={t==='/'}>{l}</NavLink>)}<Link className="btn" to="/book-a-quote">Book a Quote</Link></motion.div>}</AnimatePresence></header>}
