import React, { useRef } from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame, useThree } from '@react-three/fiber';
import { Decal, useGLTF, useTexture, OrbitControls, PivotControls } from '@react-three/drei';

import state from '../store';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';
import { Raycaster, Vector2 } from 'three';

const Shirt = () => {
  const snap = useSnapshot(state);
  const meshRef = useRef();
  const decalRef1 = useRef();
  const decalRef2 = useRef();
  const { nodes, materials } = useGLTF('/shirt.glb');
  const logoTexture = useTexture(snap.frontLogoDecal);
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
  const { camera, gl } = useThree();

  const stateString = JSON.stringify(snap);
  const handleClick = (event) => {
    // Create a raycaster and a mouse vector
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    // Calculate mouse position in normalized device coordinates (NDC)
    mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;

    // Set raycaster from the camera
    raycaster.setFromCamera(mouse, camera);

    // Find intersected objects
    const intersects = raycaster.intersectObjects(event.object.parent.children);

    if (intersects.length > 0) {
      // Sort intersected objects by distance from the camera (closer first)
      intersects.sort((a, b) => a.distance - b.distance);

      // Get the topmost intersected object
      const topIntersected = intersects[0].object;

      // Check if the topmost intersected object is a Decal
      if (topIntersected.geometry.constructor.name === 'DecalGeometry') {
        const index = event.object.parent.children.indexOf(topIntersected);
        console.log("Topmost Clicked Object UUID:", topIntersected.geometry.uuid);
        console.log("Topmost Clicked Decal Index:", index);

        // Prevent further processing of other intersected objects
        event.stopPropagation();
      }
    }
  };

  return (
    <>
      <OrbitControls />
      <group key={stateString}>
        <mesh
          geometry={nodes.T_Shirt_male.geometry}
          material={materials.lambert1}
          material-metalness={0.1}
          dispose={null}
          ref={meshRef}
          onClick={handleClick}
        >

        {snap.isFrontLogoTexture && (
            <>
              <Decal
              userData={{id:1}}
                position={snap.frontLogoPosition}
                rotation={snap.frontLogoRotation}
                scale={snap.frontLogoScale}
                map={logoTexture}
                map-anisotropy={16}
                depthTest={false}
                depthWrite={true}    
                name={"decal1"}        
              />
              <Decal
              userData={{id:2}}
                position={snap.frontLogoPosition2}
                rotation={snap.frontLogoRotation2}
                scale={snap.frontLogoScale2}
                map={logoTexture}
                map-anisotropy={16}
                depthTest={false}
                depthWrite={true}
                name={"decal2"}      
              />
            </>
          )}
        </mesh>

        

      </group>
    </>
  );
}

export default Shirt
