import {useState} from 'react';
// Tries src, then any fallback(s), then a shared pool of existing project images, so an image area is never empty.
const POOL=['/images/about/about-az.png','/images/hero/hero.png','/images/services/car-service.jpg'];
export default function SmartImage({src,alt,className='',eager,fallback,pos}){
 const chain=[...new Set([src,...[].concat(fallback||[]),...POOL].filter(Boolean).map(encodeURI))];const [i,setI]=useState(0);
 if(i<chain.length)return <img className={className} src={chain[i]} alt={alt} loading={eager?'eager':'lazy'} style={pos?{objectPosition:pos}:undefined} onError={()=>setI(i+1)}/>;
 return <div className={'ph '+className} role="img" aria-label={alt+' (image unavailable)'}/>}
