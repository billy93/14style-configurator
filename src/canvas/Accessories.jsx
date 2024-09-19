import { Decal, PivotControls, useTexture } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useKeyboard } from '../components/useKeyboard';
import { useFrame } from '@react-three/fiber';
import state from '../store';
import { useSnapshot } from 'valtio';

const Accessories = ({item, index, snap, state, set, nodes, meshRef}) => {
    const keyboard = useKeyboard();
    const [position, setPosition] = useState(item.position);
    const [rotation, setRotation] = useState(item.rotation);
    // const [rotationTemp, setRotationTemp] = useState()

    console.log(meshRef)
    useFrame((s, delta) => {
        if (item.active) {
            let speed = 0.002; // Movement speed
            
            const updatePosition = (deltaPos) => {
              const newPos = item.position.map((coord, i) => coord + deltaPos[i]);
              state.decals[index].position = newPos;
              set({
                [`position_${index}`]: newPos
              })
            };

            const updateRotation = (deltaPos) => {
                const newPos = item.rotation.map((coord, i) => coord + deltaPos[i]);
                state.decals[index].rotation = newPos;
                set({
                  [`rotation_${index}`]: newPos
                })
              };
      
            if (keyboard['w']) updatePosition([0, speed, 0]);
            if (keyboard['s']) updatePosition([0, -speed, 0]);
            if (keyboard['a']) updatePosition([-speed, 0, 0]);
            if (keyboard['d']) updatePosition([speed, 0, 0]);
            if (keyboard['q']) updatePosition([0, 0, -speed]);
            if (keyboard['e']) updatePosition([0, 0, speed]);

            // speed = 0.05; // Movement speed

            // if(keyboard['i']) updateRotation([-speed, 0, 0]);
            // if(keyboard['k']) updateRotation([speed, 0, 0]);

            // if(keyboard['j']) updateRotation([0, 0, speed]);
            // if(keyboard['l']) updateRotation([0, 0, -speed]);

            // if(keyboard['u']) updateRotation([0, speed, 0]);
            // if(keyboard['o']) updateRotation([0, -speed, 0]);

          }
    });
  
    const groupRef = useRef();
    // const meshRef = useRef();
 const targetPosition = new THREE.Vector3();
 // State to manage the smoothed position for better control over movement
 const [smoothPosition] = useState(() => new THREE.Vector3(...item.position));
  return (
    <>
    {item.active &&
    <group ref={groupRef} 
    position={new THREE.Vector3(position[0], position[1], position[2])} 
    >
        <PivotControls
        scale={0.5}
        rotation={new THREE.Euler(rotation[0], rotation[1], rotation[2])}
        activeAxes={[true, true, true]}
        onDrag={(local) => {          
              // Get the dragged position as the target
              local.decompose(targetPosition, new THREE.Quaternion(), new THREE.Vector3());

              // Interpolate between the current and target positions for smooth movement
              smoothPosition.lerp(targetPosition, 0.3); // 0.1 is the interpolation factor (adjust for smoothness)

              // Update the object's local position for smooth animation
              meshRef.current.position.set(smoothPosition.x, smoothPosition.y, smoothPosition.z);

              // Update the state with the smoothed position
              // set({
              //   [`position_${index}`]: [smoothPosition.x, smoothPosition.y, smoothPosition.z],
              // });

              // Update the state.decals array for global reference
              // state.decals[index].position = [smoothPosition.x, smoothPosition.y, smoothPosition.z];
            
            // const currentPosition = new THREE.Vector3(item.position[0],item.position[1],item.position[2])                  
            // const currentRotation = new THREE.Euler(item.rotation[0],item.rotation[1],item.rotation[2])                  
            // const pos = new THREE.Vector3()
            // const scl = new THREE.Vector3()
            // const quaternion = new THREE.Quaternion()
            // local.decompose(pos, quaternion, scl)
            // const finalPos = currentPosition.add(pos);
            // state.decals[index].position = [pos.x, pos.y, pos.z];
            // set({
            //     [`position_${index}`]: [pos.x, pos.y, pos.z],
            //     // [`rotation_${index}`]: [resultEuler.x, resultEuler.y, resultEuler.z], // Rotation reflects the current state
            // });
            // Convert quaternion to Euler angles for rotation (no scaling factor)
            // const rot = new THREE.Euler().setFromQuaternion(quaternion, "XYZ");
            /*       
            
            const sensitivity = 0.1; 
            // Combine current rotation with the rotation change from dragging
            const resultEuler = new THREE.Euler(
            currentRotation.x + rot.x,
            currentRotation.y + rot.y,
            currentRotation.z + rot.z
            );

            // Update state for position and rotation
            state.decals[index].position = [finalPos.x, finalPos.y, finalPos.z];
            state.decals[index].rotation = [resultEuler.x, resultEuler.y, resultEuler.z]; // Directly set from quaternion

            // Ensure the UI control reflects the same rotation and position values
            set({
                [`position_${index}`]: [finalPos.x, finalPos.y, finalPos.z],
                [`rotation_${index}`]: [resultEuler.x, resultEuler.y, resultEuler.z], // Rotation reflects the current state
            });
            */
        }}
        onDragEnd={() => {
            // set({
            //     [`rotation_${index}`]: rotationTemp,                
            // })
        }}

        />
    </group>           
    }
    {/* <mesh position={item.position} rotation={item.rotation} scale={item.scale}> */}
      <Decal debug={item.active}  position={item.position} rotation={item.rotation} scale={item.scale} map={useTexture(item.image)}/>
    {/* </mesh> */}
    {/* <Decal debug={item.active} position={item.position} rotation={item.rotation} scale={item.scale} map={useTexture(item.image)} /> */}
    </> 
  )
}

export default Accessories