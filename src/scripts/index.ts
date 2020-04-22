import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRM, VRMSchema } from "@pixiv/three-vrm";
import {
  setupCamera,
  setupRenderer,
  setupLight,
  setupObject,
} from "./setup_scene";

window.addEventListener("DOMContentLoaded", () => {
  initScene();
});

const initScene = () => {
  let model: VRM | null = null;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x424242);
  scene.fog = new THREE.FogExp2(0x424242, 0.002);
  const clock = new THREE.Clock();

  clock.start();

  const camera = setupCamera();

  const renderer = setupRenderer();
  const canvas = renderer.domElement;
  document.body.appendChild(canvas);

  const lights = setupLight();
  scene.add(...lights);

  const objects = setupObject();
  scene.add(...objects);

  const loader = new GLTFLoader();
  loader.load(
    "./static/models/test.vrm",

    (gltf) => {
      VRM.from(gltf).then((vrm) => {
        scene.add(vrm.scene);
        model = vrm;
        fetch("./static/json/initialPose.json")
          .then((res) => res.json())
          .then((json) => model?.humanoid?.setPose(json));
        camera.lookAt(
          vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName.Hips)!.position
        );
      });
    }
  );

  const animate = () => {
    const delta = clock.getDelta();
    model?.update(delta);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
};
