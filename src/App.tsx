import { Application, Assets, Sprite } from "pixi.js";
import { useEffect, useState, useRef } from "react";
import './App.css';

// Create a PixiJS application.
const app = new Application();

function App() {
  const domNode = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    app.init({ background: "#1099bb", resizeTo: window }).then(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) {
      // Load the bunny texture.
      Assets.load("https://pixijs.com/assets/bunny.png").then((texture) => {
        // Create a new Sprite from an image path
        const bunny = new Sprite(texture);
        app.stage.addChild(bunny);
        // Center the sprite's anchor point
        bunny.anchor.set(0.5);
        // Move the sprite to the center of the screen
        bunny.x = app.screen.width / 2;
        bunny.y = app.screen.height / 2;
      });
    }
  }, [ready]);

  useEffect(() => {
    if (ready && domNode.current) {
      domNode.current.appendChild(app.canvas);
    }
  }, [ready]);

  return <div  ref={domNode} className="main" />;
}

export default App;
