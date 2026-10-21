import {motion,useReducedMotion} from 'framer-motion';
export default function Reveal({children,delay=0,as='div',className=''}){
  const r=useReducedMotion();const M=motion[as];
  return <M className={className} initial={r?false:{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{ once: true, margin: "0px 0px -12% 0px" }} transition={{duration:.7,delay,ease:[.2,.7,.2,1]}}>{children}</M>;
}
