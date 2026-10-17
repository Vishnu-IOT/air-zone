import {motion,useReducedMotion} from 'framer-motion';
export default function Reveal({children,delay=0,as='div',className=''}){
  const r=useReducedMotion();const M=motion[as];
  return <M className={className} initial={r?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.7,delay,ease:[.2,.7,.2,1]}}>{children}</M>;
}
