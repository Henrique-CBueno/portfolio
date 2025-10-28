import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

interface ModelViewerProps {
  modelUrl?: string;
  autoRotateSpeed?: number;
}

export default function ModelViewer({ 
  modelUrl, 
  autoRotateSpeed = 0.01 
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, camera, renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.2, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    // Removido outputEncoding (deprecated no Three.js r152+)
    // Use renderer.outputColorSpace = THREE.SRGBColorSpace se necessário
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Luzes
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemi.position.set(0, 2, 0);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 10, 7.5);
    scene.add(dir);

    // --- Grupo do modelo
    const rotatingGroup = new THREE.Group();
    scene.add(rotatingGroup);

    // --- Fallback caso não haja modelo
    const addFallback = () => {
      const geo = new THREE.TorusKnotGeometry(0.7, 0.25, 160, 32);
      const mat = new THREE.MeshStandardMaterial({
        metalness: 0.6,
        roughness: 0.25,
      });
      const mesh = new THREE.Mesh(geo, mat);
      rotatingGroup.add(mesh);
    };

    // --- Carregamento do modelo GLTF
    const loader = new GLTFLoader();
    if (modelUrl) {
      loader.load(
        modelUrl,
        (gltf) => {
          const root = gltf.scene || gltf.scenes?.[0];
          if (!root) {
            addFallback();
          } else {
            const box = new THREE.Box3().setFromObject(root);
            const size = box.getSize(new THREE.Vector3()).length();
            const center = box.getCenter(new THREE.Vector3());
            root.position.sub(center);
            const scale = 2.0 / size;
            root.scale.setScalar(isFinite(scale) ? scale : 1);
            rotatingGroup.add(root);
          }
        },
        undefined,
        () => addFallback()
      );
    } else {
      addFallback();
    }

    // --- Controles (OrbitControls)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.zoomSpeed = 0.8;
    controls.enableRotate = true;
    controls.minDistance = 3;
    controls.maxDistance = 6;
    controls.maxPolarAngle = Math.PI - 0.1;
    controls.minPolarAngle = 0.1;

    // --- Resize handler
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // --- Loop de animação
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      rotatingGroup.rotation.y += autoRotateSpeed;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      controls.dispose();
      rotatingGroup.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m: THREE.Material) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl, autoRotateSpeed]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] rounded-lg overflow-hidden"
    />
  );
}