import Environment from "./components/environment.js";
import * as THREE from "../node_modules/three/build/three.module.js";

const preload = () => {
  let manager = new THREE.LoadingManager();
  manager.onLoad = function () {
    new Environment(typo, particle);
  };

  var typo = null;
  const loader = new THREE.FontLoader(manager);
  const font = loader.load("/src/font/font.json", function (font) {
    typo = font;
  });
  const particle = new THREE.TextureLoader(manager).load(
    "/src/textures/particle_a64uzf.png"
  );
};

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
)
  preload();
else document.addEventListener("DOMContentLoaded", preload);
