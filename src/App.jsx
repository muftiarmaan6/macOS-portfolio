import {Navbar, Welcome, Dock} from "#components/imports";
import { Draggable } from "gsap/Draggable";

import gsap from "gsap";
import {Resume, Safari, Terminal} from "#windows/imports";
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
    </main>
  )
}

export default app;