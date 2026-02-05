import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useProgress, Html } from '@react-three/drei';
import { STLLoader } from 'three-stdlib';
import * as THREE from 'three';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{Math.round(progress)}% loading</Html>;
}

function STLModel({ url }) {
  const geom = useLoader(STLLoader, url);
  const mesh = useRef();

  // center geometry
  const centeredGeom = useMemo(() => {
    const g = geom.clone();
    g.computeBoundingBox();
    const box = g.boundingBox;
    const offset = new THREE.Vector3();
    box.getCenter(offset).negate();
    g.translate(offset.x, offset.y, offset.z);
    return g;
  }, [geom]);

  // scale to fit
  const scale = useMemo(() => {
    const box = centeredGeom.boundingBox;
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    return maxDim > 0 ? 1.0 / maxDim * 1.2 : 1;
  }, [centeredGeom]);

  useFrame(() => {
    if (mesh.current) mesh.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={mesh} geometry={centeredGeom} scale={scale}>
      <meshStandardMaterial color="#9ca3af" metalness={0.5} roughness={0.3} />
    </mesh>
  );
}

export default function CADShowcase({ cad }) {
  if (!cad) return <div className="text-slate-400">No CAD files available for this project.</div>;

  const stlFile = cad.files && cad.files.find(f => f.type === 'stl');
  const sldprtFile = cad.files && cad.files.find(f => f.type === 'sldprt');
  const renders = (cad.renders || []).filter((r) => !String(r).endsWith('/model_thumb.svg'));

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full h-80 rounded-xl overflow-hidden bg-slate-900 border border-[var(--theme-primary)]/20">
          {stlFile ? (
            <Canvas camera={{ position: [0, 0, 2.5] }}>
              <ambientLight intensity={0.6} />
              <directionalLight intensity={0.8} position={[5, 5, 5]} />
              <Suspense fallback={<Loader />}>
                <STLModel url={stlFile.src} />
              </Suspense>
              <OrbitControls autoRotate={false} enablePan={true} />
            </Canvas>
          ) : renders.length ? (
            <img src={renders[0]} alt="CAD render" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">No preview available</div>
          )}
        </div>

        <div className="w-full">
          <h4 className="text-white font-semibold mb-2">CAD Files & Downloads</h4>
          <div className="flex flex-col gap-2">
            {stlFile && (
              <a href={stlFile.src} className="px-4 py-2 rounded-md bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] text-sm border border-[var(--theme-primary)]/20 inline-block" download>
                Download STL ({stlFile.name})
              </a>
            )}

            {sldprtFile && (
              <a href={sldprtFile.src} className="px-4 py-2 rounded-md bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] text-sm border border-[var(--theme-primary)]/20 inline-block" download>
                Download SolidWorks ({sldprtFile.name})
              </a>
            )}
          </div>

        </div>
      </div>

      {/* thumbnails */}
      {renders.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-3">
          {renders.map((r, i) => (
            <img key={i} src={r} alt={`render-${i}`} className="w-full h-24 object-cover rounded-md border border-slate-800" />
          ))}
        </div>
      )}
    </div>
  );
}
