import {useState,useEffect} from 'react';import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
export default function Splash(){const r=useReducedMotion();
 const [show,setShow]=useState(()=>{try{return !sessionStorage.getItem('az-splash')}catch{return true}});
 useEffect(()=>{if(!show)return;try{sessionStorage.setItem('az-splash','1')}catch{}const t=setTimeout(()=>setShow(false),r?500:2200);return()=>clearTimeout(t)},[show,r]);
 return <AnimatePresence>{show&&<motion.div className="splash" exit={{opacity:0}} transition={{duration:.6}} onClick={()=>setShow(false)} role="presentation">
  <motion.div className="splash-logo" initial={r?false:{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{duration:1,ease:[.2,.7,.2,1]}}>
   <img src="/images/branding/splash-screen-logo.png" alt="Air Zone Automobile"/>{!r&&<span className="sweep" aria-hidden="true"/>}</motion.div></motion.div>}</AnimatePresence>}
