import {motion,useReducedMotion} from 'framer-motion';
export default function Lines({lines,as:T='h2',className=''}){const r=useReducedMotion();
 return <T className={className}>{lines.map((l,i)=><span key={l} className="line"><motion.span initial={r?false:{y:'110%'}} whileInView={{y:0}} viewport={{once:true,margin:'-40px'}} transition={{duration:.8,delay:i*.12,ease:[.2,.7,.2,1]}}>{l}</motion.span></span>)}</T>}
