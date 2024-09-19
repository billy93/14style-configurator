import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Decal, useTexture, PivotControls } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import state from '../store';
import { easing } from 'maath';
import Accessories from './Accessories';

const ShirtApp = (props) => {
  const { camera } = useThree();
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

  const { nodes, materials } = useGLTF('/shirt.glb');

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
  return (
    <>
      <OrbitControls makeDefault />
      <mesh
        geometry={nodes.T_Shirt_male.geometry}
        ref={meshRef}
        material={materials.lambert1}
        material-metalness={0.1}
        onContextMenu={handleContextMenu}
        dispose={null}
      >
        {snap.decals.map((item, index) => (
          <group>
            <PivotControls
              scale={0.1}
              // rotation={new THREE.Euler(item.rotation[0], item.rotation[1], item.rotation[2])}
              activeAxes={[true, true, true]}
              onDrag={(local) => {
                // const targetPosition = new THREE.Vector3();
                // local.decompose(targetPosition, new THREE.Quaternion(), new THREE.Vector3());
                // console.log(targetPosition)

                // state.decals[index].position = [targetPosition.x, targetPosition.y, targetPosition.z];
              }}
            />
            <Decal
              mesh={meshRef}
              debug={true}
              position={item.position}
              rotation={item.rotation}
              scale={item.scale}
              map={new THREE.TextureLoader().load(item.image)}
              />
          </group>
        ))}
      </mesh>
    </>
  );
};


          {/* <Accessories
            item={item}
            key={index}
            index={index}
            snap={snap}
            state={state}
            set={props.set}
            nodes={nodes}
            materials={materials}
            meshRef={meshRef.current}
          /> */}
export default ShirtApp;
