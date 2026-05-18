import {Navbar, Welcome, Dock} from "#components/imports";
import { Draggable } from "gsap/Draggable";

import gsap from "gsap";
import {Resume, Safari, Terminal, Finder, Contact, ImgFile} from "#windows/imports";
gsap.registerPlugin(Draggable);

const  app = () => {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal/>
      <Safari/>
      <Resume/>
      <Finder/>
      <Contact/>
      <ImgFile/>
    </main>
  )
}

export default app;