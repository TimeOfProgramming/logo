import * as THREE from "../../three/build/three.module.js";
import CreateParticles from "./createParticles.js";

class Environment {
  constructor(font, particle) {
    this.font = font;
    this.particle = particle;
    this.container = document.querySelector("#magic");
    this.scene = new THREE.Scene();
    this.createCamera();
    this.createRenderer();
    this.setup();
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  setup() {
    this.createParticles = new CreateParticles(
      this.scene,
      this.font,
      this.particle,
      this.camera,
      this.renderer
    );
  }

  render() {
    this.createParticles.render();
    this.renderer.render(this.scene, this.camera);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      65,
      this.container.clientWidth / this.container.clientHeight,
      1,
      10000
    );
    this.camera.position.set(0, 0, 100);
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);

    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  onWindowResize() {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
  }
}

export default Environment;
