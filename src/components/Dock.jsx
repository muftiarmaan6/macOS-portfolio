
import { dockApps } from "#constants/constant";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react"
import { Tooltip } from "react-tooltip"


const Dock = () => {

  const dockRef = useRef(null);

  useGSAP(()=>{
    const dock = dockRef.current;
    if(!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");
    const animateDockIcons= (mousePosX) =>{
      const {left} = dock.getBoundingClientRect();
      icons.forEach( (icon)=> {
        const {left: iconLeft, width} = icon.getBoundingClientRect();
        const center = iconLeft - left + width/2;
        const distance = Math.abs(mousePosX- center);
        // const RADIUS = 120;
        // const intensity = Math.max(0, 1 - distance / RADIUS);
        const intensity= Math.exp(-(distance ** 2.5)/20000);

        gsap.to(icon, {
          scale: 1+ 0.25 * intensity,
          y: -15* intensity,
          duration: 0.2,
          ease: "power2.out",
        })
      });
    };
    const detectMouseEnter = (e) => {
      const {left} = dock.getBoundingClientRect();
      animateDockIcons(e.clientX - left);
    }
    const resetIcons = () => icons.forEach((icon)=> {
      gsap.to(icon, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    dock.addEventListener("mousemove", detectMouseEnter);
    dock.addEventListener("mouseleave", resetIcons);

    return ()=>{
      dock.removeEventListener("mousemove", detectMouseEnter);
      dock.removeEventListener("mouseleave", resetIcons);
    }
  },[]);

  const openApp = (app) => {};
  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({id, name, icon, canOpen})=>(
          <div key={id} className="relative flex justify-center">
            <button
            type="button"
            className="dock-icon"
            aria-label={name}
            data-tooltip-id="dock-tooltip"
            data-tooltip-content={name}
            data-tooltip-delay-show={150}
            disabled={!canOpen}
            onClick={()=> openApp({id, canOpen})}
            >
              <img src={`/images/${icon}`}
               alt={name}
               loading="lazy"
               className={canOpen ? '' : 'opacity-50'} />
            </button>
          </div>
        ))}

        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  )
}

export default Dock