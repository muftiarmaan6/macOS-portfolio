import React, { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FONT_WEIGHTS={
  subtitle: {min:100, max:400, default:100},
  title: {min:500, max:900, default:500}
}

const renderContainer= (text, className, textWeight= 400) =>{
    return [...text].map((char,i)=>(
      <span
      key={i}
      className={className}
      style={{fontVariationSettings:`'wght' ${textWeight}`}}
      >
        {char===' ' ? '\u00A0': char}
      </span>
    ));
}

const textHoverAnimation= (container, type) => {
    if(!container) return ()=>{};

    const letters= container.querySelectorAll("span");
    const {min, max , default: base} = FONT_WEIGHTS[type];

    const animateLetter = (letter, weight, duration= 0.25)=>{
      return gsap.to(letter, {duration, ease:'power2.out', 
        fontVariationSettings: `'wght' ${weight}`,
      });
    }

    const detectMouseEnter = (e) =>{
        const {left} = container.getBoundingClientRect();
        const posX= e.clientX - left;

        letters.forEach((letter)=>{
          const {left: l, width:w} = letter.getBoundingClientRect();
          const distance = Math.abs(posX - (l-left + w/5));
          //Testing out different animation intensities:
          // const intensity= Math.exp(-(distance ** 2)/5000);
          //const intensity = Math.max(0, 1 - distance / 120);
          // const t = Math.max(0, 1 - distance / 140);
          // const intensity = t * t;
          const sigma = 80;
          const intensity = Math.exp(-(distance * distance) / (2 * sigma * sigma));



          animateLetter(letter, min+(max-min)*intensity);
        })
    }
    const detectMouseLeave = () => 
      letters.forEach((letter) => animateLetter(letter, base, 0.3));

    container.addEventListener("mousemove", detectMouseEnter);
    container.addEventListener("mouseleave", detectMouseLeave);

    return () =>{
      container.removeEventListener("mousemove", detectMouseEnter);
      container.removeEventListener("mouseleave", detectMouseLeave);
    }
};

const Welcome = () => {
  const titleRef=useRef(null);
  const subtitleRef= useRef(null);
  useGSAP(()=>{
    textHoverAnimation(titleRef.current, 'title');
    textHoverAnimation(subtitleRef.current, 'subtitle');
 },[])
  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderContainer("Hey, I am Armaan! Welcome to the",
           'text-3xl font-georama',
            100)}
      </p>
      <h1 ref={titleRef} className="mt-9">
        {renderContainer("rmn-Folio",
           'text-8xl font-georama italic', 
           500)}
      </h1>

      <div className="small-screen">
          <p>This portfolio is designed for desktop/tablets only.</p>
      </div>
    </section>

    
  )
}

export default Welcome