import { Decal, PivotControls, useTexture } from '@react-three/drei'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { useKeyboard } from '../components/useKeyboard';
import { useFrame } from '@react-three/fiber';
import state from '../store';
import { useSnapshot } from 'valtio';

const Accessories = ({item, index, control}) => {
    const snap = useSnapshot(state);

    const [active, setActive] = useState(item.active);
    const [position, setPosition] = useState(item.position)
    const [rotation, setRotation] = useState(item.rotation)
    const [scale, setScale] = useState(item.scale)
    const [image, setImage] = useState(item.image)

    const keyboard = useKeyboard();

    useFrame((s, delta) => {
        if(active){
            const speed = 0.002; // Movement speed
        
            if (keyboard['w']) {
                let value = [position[0], position[1] + speed, position[2]]
                setPosition(value); // Move decal up (positive y-axis)
                // state.decals[index].position = value;
            }
            if (keyboard['s']) {
                let value = [position[0], position[1] - speed, position[2]]
                setPosition(value); // Move decal up (positive y-axis)
                // state.decals[index].position = value;
            }
            if (keyboard['a']) {
                let value = [position[0] - speed, position[1], position[2]]
                setPosition(value); // Move decal up (positive y-axis)
                // state.decals[index].position = value;
            }
            if (keyboard['d']) {
                let value = [position[0] + speed, position[1], position[2]]
                setPosition(value); // Move decal up (positive y-axis)
                // state.decals[index].position = value;
            }
        }
    });

    useEffect(() => {
        setActive(control[`active_${index}`])
        setScale(control[`scale_${index}`])
        // setPosition(control[`position_${index}`])
        // setRotation(control[`rotation_${index}`])        
    }, [control])

  return (
    <>
    {active &&
    <group position={position} >
        <PivotControls
        scale={0.3}
        activeAxes={[true, true, true]}
        onDrag={(local) => {                  
            const currentPosition = new THREE.Vector3(position[0],position[1],position[2])                  
            const pos = new THREE.Vector3()
            const scl = new THREE.Vector3()
            const quaternion = new THREE.Quaternion()
            local.decompose(pos, quaternion, scl)

            const finalPos = currentPosition.add(pos);
            const rot = new THREE.Euler().setFromQuaternion(quaternion)
        
        
            setPosition([finalPos.x, finalPos.y, finalPos.z])
            setRotation([rot.x, rot.y, rot.z])

            // state.decals[index].position = [finalPos.x, finalPos.y, finalPos.z]
        }}
        onDragEnd={() => {
            // console.log("onDragEnd")
            // state.frontLogoPosition = [pos[0],pos[1],pos[2]];
        }}

        />
    </group>           
    }
    <Decal debug={active} position={position} rotation={rotation} scale={scale} map={useTexture(image)} />
    </> 
  )
}

export default Accessories