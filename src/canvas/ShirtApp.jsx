import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useTexture, OrbitControls, PivotControls, AccumulativeShadows, RandomizedLight, Decal } from '@react-three/drei'
import { useControls, button } from 'leva'
import { useSnapshot } from 'valtio';
import state from '../store'
import { easing } from 'maath'
import Accessories from './Accessories'

const ShirtApp = (props) => {  
  const { scene, camera } = useThree();
  const snap = useSnapshot(state);
  const meshRef = useRef();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

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
 
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));


  const { nodes, materials } = useGLTF('/shirt.glb')

  return (
    <>
        <OrbitControls makeDefault />
        <mesh  geometry={nodes.T_Shirt_male.geometry}
        ref={meshRef}
            material={materials.lambert1}
            material-metalness={0.1}
            onContextMenu={handleContextMenu}
            dispose={null}>      

          {snap.decals.map((item, index) => (
            <Accessories item={item} key={index} index={index} snap={snap} state={state} set={props.set}></Accessories>            
          ))}
        </mesh>
    </>
  )
}

export default ShirtApp