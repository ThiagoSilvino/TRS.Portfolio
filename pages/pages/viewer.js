// pages/viewer.js
import { useEffect, useRef } from 'react';

export default function Viewer() {
  const mountRef = useRef(null);

  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      // dynamic imports so this only runs in the browser
      const THREE = await import('three');
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

      const mount = mountRef.current;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#f7f7f5');

      // Camera
      const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 2000);
      camera.position.set(2.5, 2, 3);

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      // Lights
      const hemi = new THREE.HemisphereLight(0xffffff, 0x9aa0a6, 1.0);
      hemi.position.set(0, 1, 0);
      scene.add(hemi);

      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 7.5);
      scene.add(dir);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;

      // Load your model
      const loader = new GLTFLoader();
      loader.load(
        '/3dmodel.glb', // your uploaded file
        (gltf) => {
          const root = gltf.scene;
          scene.add(root);

          // Frame model
          const box = new THREE.Box3().setFromObject(root);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          // Recenter at world origin
          root.position.x += (root.position.x - center.x);
          root.position.y += (root.position.y - center.y);
          root.position.z += (root.position.z - center.z);

          // Fit camera to object
          const maxDim = Math.max(size.x, size.y, size.z);
          const fitDist = maxDim / (2 * Math.tan((camera.fov * Math.PI) / 360));
          camera.position.set(center.x + fitDist, center.y + fitDist * 0.6, center.z + fitDist);
          controls.target.copy(center);
          controls.update();
        },
        undefined,
        (err) => {
          console.error('GLB load error:', err);
        }
      );

      // Resize handler
      const onResize = () => {
        const { clientWidth, clientHeight } = mount;
        renderer.setSize(clientWidth, clientHeight);
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize);

      // Render loop
      let rafId;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Cleanup
      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', onResize);
        controls.dispose();
        renderer.dispose();
        mount.removeChild(renderer.domElement);
      };
    })();

    return () => cleanup();
  }, []);

  return (
    <div style={{ height: '100vh', display: 'grid', gridTemplateRows: '48px 1fr', background: '#f7f7f5' }}>
      <header style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 .9rem', borderBottom:'1px solid #e5e7eb', background:'#fff' }}>
        <a href="/home" style={{ textDecoration:'none', color:'#111' }}>← Back to Projects</a>
        <div style={{ opacity:.7 }}>3D Model Viewer</div>
        <div />
      </header>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
