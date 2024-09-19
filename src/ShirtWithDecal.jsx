import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Decal, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import state from './store';
import { subscribe, useSnapshot } from 'valtio';
import CameraRig from './canvas/CameraRig';

export default function ShirtWithDecal(props) {
  const { camera } = useThree();
  const shirtRef = useRef();
  const meshRef = useRef();
  const snap = useSnapshot(state);
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  

  // Load the shirt model
  const { nodes, materials } = useGLTF('/shirt.glb');

  // Function to handle dragging the decal
  const handlePointerMove = (event) => {
    const distance = Math.sqrt(
      Math.pow(event.clientX - startDragPosition.current.x, 2) + 
      Math.pow(event.clientY - startDragPosition.current.y, 2)
    );

    if (distance > 5) { // Threshold untuk mendeteksi drag
      setIsDragging(true);
    }

    if(snap.index != -1){
      const intersect = event.intersections[0];
      if (intersect) {
        const point = intersect.point; // Get the position on the mesh

        try{
          state.decals[snap.index].position = [point.x, point.y, point.z];
          // console.log(state.decals[props.index].position)
          props.set({
            //   [`scale_${index}`]: 0.15,
              [`position_${snap.index}`]: [point.x, point.y, point.z],
            //   [`rotation_${index}`]: [0, 0, 0],
            //   [`active_${index}`]: false,
            //   [`scale_${index}`]: {},        
          })
        }catch(e){
        }
        // Optional: adjust decal rotation based on the surface normal
        // const normal = intersect.face.normal.clone().applyMatrix4(shirtRef.current.matrixWorld).normalize();
        // const rotation = new THREE.Euler().setFromVector3(normal);
        // state.decals[0].position = point;
        // setDecalRotation(rotation);
      }
    }
  };

  const handleContextMenu = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(meshRef.current);
    if (intersects.length > 0) {
      const point = intersects[0].point;
      const rotation = camera.rotation;
      props.onRightClick(event.clientX, event.clientY, [point.x, point.y, point.z], [rotation.x, rotation.y, rotation.z]);
    }
  };

  const [isDragging, setIsDragging] = useState(false);
  const startDragPosition = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    startDragPosition.current = { x: e.clientX, y: e.clientY }; // Simpan posisi awal pointer
    setIsDragging(false); // Reset drag flag
  };

  const handlePointerUp = () => {
    setIsDragging(false); // Selesai drag
  };

  const handleClick = () => {
    if (isDragging) return;
    if(snap.index != -1){
      let currentIndex = snap.index;
      state.decals[currentIndex].active = false;
      state.index = -1;
      props.set({
          [`active_${currentIndex}`]: false,
      })
    }
    else{

    }
  }
  
  return (
    <>
      <OrbitControls makeDefault/>
      
        <group ref={shirtRef} onPointerMove={handlePointerMove} 
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onClick={handleClick}>
          <mesh ref={meshRef} geometry={nodes.T_Shirt_male.geometry} 
            material={materials.lambert1}
            onContextMenu={snap.index == -1 ? handleContextMenu : null}>
            
            {snap.decals.map((item, index) => (
              <Decal
                position={item.position}
                rotation={item.rotation}
                scale={item.scale}
                map={new THREE.TextureLoader().load(item.image)}
                depthTest={true}
                depthWrite={false}
              />
            ))}
          </mesh>
        </group>
    </>
  );
}