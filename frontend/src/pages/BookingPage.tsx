import {useEffect,useRef,useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {services} from '../content/services';
import {site} from '../content/siteContent';
import '../styles/booking.css';

function dateValue(day:Date){
  return `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,'0')}-${String(day.getDate()).padStart(2,'0')}`;
}

export function BookingPage(){
  const [params]=useSearchParams();
  const [selected,setSelected]=useState(services[0].slug);
  const [step,setStep]=useState(1);
  const [time,setTime]=useState('');
  const [date,setDate]=useState('');
  const heading=useRef<HTMLHeadingElement>(null);
  const previousStep=useRef(step);
  const today=dateValue(new Date());
  const days=Array.from({length:14},(_,i)=>{
    const day=new Date();
    day.setDate(day.getDate()+i);
    return day;
  });
  useEffect(()=>{
    const match=services.find(s=>s.slug===params.get('tjanst'));
    if(match)setSelected(match.slug);
  },[params]);
  useEffect(()=>{
    if(previousStep.current!==step){
      heading.current?.focus({preventScroll:true});
      previousStep.current=step;
    }
  },[step]);
  const service=services.find(s=>s.slug===selected)!;
  const validDate=Boolean(date&&date>=today);
  const isClosed=Boolean(date&&new Date(`${date}T12:00:00`).getDay()===0);
  const chooseDate=(value:string)=>{setDate(value);setTime('')};
  const formattedDate=date?new Date(`${date}T12:00:00`).toLocaleDateString('sv-SE',{weekday:'long',day:'numeric',month:'long'}):'';

  return <section className="booking-experience wrap section">
    <div className="booking-intro">
      <p className="eyebrow">Ditt nästa besök</p>
      <h1>Ta plats<br/>i stolen.<br/>{' '}Hitta din<br/>nästa stil.</h1>
      <p className="lead">Välj behandling och en tid som passar dig. Vi tar hand om detaljerna.</p>
      <div className="booking-location"><span>ED FRISÖR · TROLLHÄTTAN</span><p>{site.address}</p></div>
    </div>
    <div className="booking-flow">
      <div className="booking-panel">
        <nav className="booking-progress" aria-label="Bokningssteg">
          <ol>{['Behandling','Datum & tid','Ditt val'].map((label,i)=><li key={label} className={step===i+1?'current':step>i+1?'complete':''} aria-current={step===i+1?'step':undefined}>
            <button disabled={i+1>step} onClick={()=>setStep(i+1)}><strong>0{i+1}</strong><span>{label}</span></button>
          </li>)}</ol>
          <div className="booking-progress-line" style={{transform:`scaleX(${step/3})`}}/>
        </nav>
        <div className="booking-stage" key={step}>
          {step===1?<>
            <h2 ref={heading} tabIndex={-1}>Vad vill du boka?</h2>
            <div className="booking-service-list" role="group" aria-label="Välj behandling">
              {services.map(s=><button key={s.slug} className="booking-service booking-choice" aria-pressed={selected===s.slug} onClick={()=>setSelected(s.slug)}>
                <span><strong>{s.title}</strong><small>{s.duration} · {s.confirmed?'ungefärligt pris':'demopris'}</small></span><b>{s.price} kr</b>
              </button>)}
            </div>
            <button className="button booking-next" onClick={()=>setStep(2)}>Välj önskad tid <span>→</span></button>
          </>:step===2?<>
            <button className="booking-back" onClick={()=>setStep(1)}>← {service.title}</button>
            <h2 ref={heading} tabIndex={-1}>När passar det?</h2>
            <p className="note">Exempeltider för att visa flödet. Ingen koppling till salongens kalender.</p>
            <p className="booking-label">Välj en dag</p>
            <div className="booking-days" role="group" aria-label="Välj datum">
              {days.map((day,i)=>{const value=dateValue(day);return <button key={value} className="booking-day booking-choice" aria-pressed={date===value} aria-label={day.toLocaleDateString('sv-SE',{weekday:'long',day:'numeric',month:'long'})} onClick={()=>chooseDate(value)}>
                <span>{i===0?'Idag':day.toLocaleDateString('sv-SE',{weekday:'short'})}</span><strong>{day.getDate()}</strong><small>{day.toLocaleDateString('sv-SE',{month:'short'})}</small>
              </button>})}
            </div>
            <label className="booking-date">Eller ett annat datum<input type="date" min={today} value={date} required onChange={e=>chooseDate(e.target.value)}/></label>
            {!validDate?<p className="note">Välj ett datum från idag och framåt för att se exempeltider.</p>:isClosed?<div className="booking-closed-notice" role="status"><p>Salongen är stängd på söndagar. Vänligen välj ett annat datum.</p></div>:<div className="booking-times" key={date}>
              <p className="booking-label">Välj en exempeltid</p>
              {[{label:'Förmiddag',times:['10:00','11:30']},{label:'Eftermiddag',times:['13:00','14:30','16:00']}].map(group=><div className="booking-time-group" key={group.label}>
                <h3>{group.label}</h3><div>{group.times.map(t=><button key={t} className="booking-choice booking-time" aria-pressed={time===t} onClick={()=>setTime(t)}>{t}</button>)}</div>
              </div>)}
            </div>}
            <button className="button booking-next" disabled={!validDate||!time||isClosed} onClick={()=>setStep(3)}>Visa ditt val <span>→</span></button>
          </>:<>
            <button className="booking-back" onClick={()=>setStep(2)}>← Ändra datum eller tid</button>
            <h2 ref={heading} tabIndex={-1}>Ditt nästa besök.</h2>
            <div className="booking-selection"><p className="eyebrow">Ditt val · demo</p><h3>{formattedDate} · {time}</h3><p>{service.title} · {service.duration} · {service.confirmed?'cirka':'demopris'} {service.price} kr</p></div>
            <p><strong>Ingen bokning har gjorts.</strong> Ring ED Frisör för att bekräfta en riktig tid och aktuellt pris.</p>
            <a className="button booking-next" href={site.phoneHref}>Ring {site.phone} <span>↗</span></a>
            <button className="booking-back booking-restart" onClick={()=>{setStep(1);setTime('');setDate('')}}>Börja om ↺</button>
          </>}
        </div>
      </div>
      <p className="booking-help">Vill du hellre prata med oss? Ring <a href={site.phoneHref}>{site.phone}</a>.</p>
    </div>
  </section>;
}
