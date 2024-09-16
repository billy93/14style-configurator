import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useTexture, OrbitControls, PivotControls, AccumulativeShadows, RandomizedLight, Decal } from '@react-three/drei'
import { useControls } from 'leva'
import { useSnapshot } from 'valtio';
import state from '../store'
import { easing } from 'maath'
import { useKeyboard } from '../components/useKeyboard'
import Accessories from './Accessories'

const ShirtApp = (props) => {  
  const { scene, camera } = useThree();
  const snap = useSnapshot(state);
  const meshRef = useRef();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Function to handle right-click
  const handleContextMenu = (event) => {
    //event.preventDefault();

    // Get mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check if the ray intersects the mesh
    const intersects = raycaster.intersectObject(meshRef.current);
    if (intersects.length > 0) {
      const point = intersects[0].point; // This is the clicked 3D position

      // Pass the position to the parent to trigger the context menu in HTML
     props.onRightClick(event.clientX, event.clientY, point);
    }
  };
 
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const control = useControls(snap.decals.reduce((acc, decal, index) => {
    acc[`scale_${index}`] = {
      value: decal.scale,
      step: 0.01,
      min: 0.01,
      max: 1,
    };
    acc[`active_${index}`] = decal.active;
    acc[`image_${index}`] = {image:decal.image};
    return acc;
  }, {}), [snap.decals]);
  
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
              <Accessories key={index} item={item} index={index} control={control} state={state}></Accessories>
              
            ))}

            {/* {debug &&
            <group position={snap.frontLogoPosition} >
              <PivotControls
                scale={0.3}
                activeAxes={[true, true, true]}
                onDrag={(local) => {                  
                  const currentPosition = new THREE.Vector3(snap.frontLogoPosition[0],snap.frontLogoPosition[1],snap.frontLogoPosition[2])                  
                  const position = new THREE.Vector3()
                  const scale = new THREE.Vector3()
                  const quaternion = new THREE.Quaternion()
                  local.decompose(position, quaternion, scale)

                  const finalPos = currentPosition.add(position);
                  const rotation = new THREE.Euler().setFromQuaternion(quaternion)
              
                  setXYZ([finalPos.x, finalPos.y, finalPos.z])
                  setRot([rotation.x, rotation.y, rotation.z])
                  // state.frontLogoPosition = position
                  // state.frontLogoPosition = [result[12], result[13], result[14]];
                  // state.frontLogoPosition = [finalPos.x, finalPos.y, finalPos.z];
                  // setScl([scale.x, scale.y, scale.z])

                  // let value = [local.elements[12], local.elements[13], local.elements[14]]
                  // setXYZ(value); // Move decal up (positive y-axis)
                  // state.frontLogoPosition = value
                }}
                onDragEnd={() => {
                  // console.log("onDragEnd")
                  // state.frontLogoPosition = [pos[0],pos[1],pos[2]];
                }}

              />
            </group>
            }
            <Decal debug={debug} position={pos} rotation={rot} scale={scl} map={useTexture(image)} />

            {debug2 &&
            <group position={snap.frontLogoPosition2}>
              <PivotControls
                scale={0.3}
                activeAxes={[true, true, true]}
                onDrag={(local) => {
                  const currentPosition = new THREE.Vector3(snap.frontLogoPosition2[0],snap.frontLogoPosition2[1],snap.frontLogoPosition2[2])                  
                  const position = new THREE.Vector3()
                  const scale = new THREE.Vector3()
                  const quaternion = new THREE.Quaternion()
                  local.decompose(position, quaternion, scale)

                  const finalPos = currentPosition.add(position);
                  const rotation = new THREE.Euler().setFromQuaternion(quaternion)
              
                  setXYZ2([finalPos.x, finalPos.y, finalPos.z])
                  setRot2([rotation.x, rotation.y, rotation.z])
                  // state.frontLogoPosition2 = position;

                  // setScl([scale.x, scale.y, scale.z])
                }}
                onDragEnd={(local) => {
                  // state.frontLogoPosition2 = pos2;
                }}
              />
            </group>
            }
            <Decal debug={debug2} position={pos2} rotation={rot2} scale={scl2} map={useTexture(image2)} /> */}

          </mesh>
      {/* </group> */}
    </>
  )
}

export default ShirtApp