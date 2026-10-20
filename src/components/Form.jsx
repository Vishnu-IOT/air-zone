import {useState} from 'react';import {useSearchParams} from 'react-router-dom';import {services} from '../data/services.js';import cfg from '../data/siteConfig.js';
const R={name:v=>v.trim()?'':'Please enter your name.',phone:v=>/^\+?[0-9\s-]{7,15}$/.test(v.trim())?'':'Enter a valid phone number.',
 email:v=>!v||/^\S+@\S+\.\S+$/.test(v)?'':'Enter a valid email address.',message:v=>v.trim()?'':'Please add a few details.'};
// INTEGRATION POINT: replace with your booking/email API call.
async function submitRequest(data){
  if(!cfg.bookingEndpoint) throw new Error('Not connected: set bookingEndpoint in src/data/siteConfig.js. Nothing was sent.');
  const r=await fetch(cfg.bookingEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  if(!r.ok) throw new Error('The server rejected the request. Please try again.');
}
export default function Form({quote,contact}){
  const [sp]=useSearchParams();
  const [v,setV]=useState({name:'',phone:'',email:'',make:'',model:'',year:'',service:sp.get('service')||'',date:'',time:'',message:''});
  const [err,setErr]=useState({}),[st,setSt]=useState('idle'),[msg,setMsg]=useState('');
  const set=k=>e=>setV({...v,[k]:e.target.value});
  async function go(e){e.preventDefault();if(st==='loading')return;
    const fields=quote?['name','phone','email']:['name','phone','email','message'];const ne={};
    fields.forEach(k=>{const m=R[k](v[k]);if(m)ne[k]=m});setErr(ne);if(Object.keys(ne).length)return;
    setSt('loading');try{await submitRequest(v);setSt('ok')}catch(x){setMsg(x.message);setSt('fail')}}
  if(st==='ok')return <div className="notice ok" role="status">Thank you — your request has been sent.</div>;
  const F=({k,label,type='text',req})=><label className="field"><span>{label}{req&&' *'}</span>
   <input type={type} value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k]?k+'-e':undefined}/>{err[k]&&<small id={k+'-e'} role="alert">{err[k]}</small>}</label>;
  return <form onSubmit={go} noValidate className="form">
   <F k="name" label="Full name" req/><F k="phone" label="Phone number" type="tel" req/><F k="email" label="Email (optional)" type="email"/>
   {(quote||contact)&&<><F k="make" label="Vehicle make"/><F k="model" label="Vehicle model"/>{quote&&<F k="year" label="Year (optional)"/>}
   <label className="field"><span>Service required</span><select value={v.service} onChange={set('service')}><option value="">Select a service</option>{services.map(s=><option key={s.slug} value={s.slug}>{s.title}</option>)}</select></label>
   {quote&&<><F k="date" label="Preferred date" type="date"/><F k="time" label="Preferred time" type="time"/></>}</>}
   <label className="field full"><span>{quote?'Additional details':'Message *'}</span><textarea rows="4" value={v.message} onChange={set('message')} aria-invalid={!!err.message}/>{err.message&&<small role="alert">{err.message}</small>}</label>
   {st==='fail'&&<div className="notice bad full" role="alert">{msg}</div>}
   <button className="btn full" disabled={st==='loading'}>{st==='loading'?'Sending…':quote?'Request a Quote':'Send Message'}</button></form>}
