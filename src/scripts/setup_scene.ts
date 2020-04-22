import * as THREE from "three";

export const setupCamera = (): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.6, 1.6);

  return camera;
};

export const setupRenderer = (): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);

  return renderer;
};

export const setupLight = (): THREE.Light[] => {
  const lights: THREE.Light[] = [];
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1).normalize();
  lights.push(light);

  const ambLight = new THREE.AmbientLight(0x212121);
  lights.push(ambLight);

  return lights;
};

export const setupObject = (): THREE.Mesh[] => {
  const objects: THREE.Mesh[] = [];
  const ground = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(100, 100),
    new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  objects.push(ground);

  return objects;
};
