import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, OrbitControls, PivotControls, AccumulativeShadows, RandomizedLight, Decal } from '@react-three/drei'
import { useControls } from 'leva'
import { useSnapshot } from 'valtio';
import state from '../store'
import { easing } from 'maath'

const ShirtApp = () => (
  <Cup/>
  // <Canvas shadows orthographic camera={{ position: [0, 10, 100], zoom: 140 }} style={{height:'100vh'}}>
  //   <ambientLight intensity={0.5 * Math.PI} />
  //   <directionalLight intensity={0.5} position={[10, 10, 10]} />
  //   <Cup scale={2} position={[0, -1, 0]} />
  //   <AccumulativeShadows temporal frames={100} alphaTest={0.95} opacity={1} scale={25} position={[0, -1, 0]}>
  //     <RandomizedLight amount={8} radius={10} ambient={0.7} position={[10, 10, -5]} bias={0.01} size={10} />
  //   </AccumulativeShadows>
  //   <OrbitControls makeDefault />
  // </Canvas>
)

function Cup(props) {
  const snap = useSnapshot(state);
  const stateString = JSON.stringify(snap);

  const [pos, setXYZ] = useState(snap.frontLogoPosition)
  const [rot, setRot] = useState(snap.frontLogoRotation)
  const [scl, setScl] = useState(snap.frontLogoScale)

  const [pos2, setXYZ2] = useState(snap.frontLogoPosition2)
  const [rot2, setRot2] = useState(snap.frontLogoRotation2)
  const [scl2, setScl2] = useState(snap.frontLogoScale2)

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
  // console.log(stateString)
  const { nodes, materials } = useGLTF('/shirt.glb')
  const { debug, image, scale, debug2, image2, scale2 } = useControls({
    debug: false,
    image: { image: '/threejs.png' },
    scale: {
      value: snap.frontLogoScale, // Nilai default skala
      step: 0.01,        // Langkah pergerakan setiap kali slider diubah
      min: 0.01,         // Batas minimum
      max: 5,           // Batas maksimum
    },
    debug2: false,
    image2: { image: '/1200px-Starbucks_Logo_ab_2011.svg.png'},
    scale2: {
      value: snap.frontLogoScale2, // Nilai default skala
      step: 0.01,        // Langkah pergerakan setiap kali slider diubah
      min: 0.01,         // Batas minimum
      max: 5,           // Batas maksimum
    },
  })

    // Update Valtio state when Leva scale changes
    useEffect(() => {
      state.frontLogoScale = scale;
      setScl(scale)
    }, [scale]);

     // Update Valtio state when Leva scale changes
     useEffect(() => {
      state.frontLogoScale2 = scale2;
      setScl2(scale2)
    }, [scale2]);

    // Calculate the center of the mesh for proper pivot placement
    const geometry = nodes.T_Shirt_male.geometry;
    geometry.computeBoundingBox();
    const center = new THREE.Vector3();
    geometry.boundingBox.getCenter(center);
    geometry.center(); // Move geometry to the center

  return (
    <>
          <OrbitControls makeDefault />

          

          {/* <group key={stateString}> */}
          <mesh  geometry={nodes.T_Shirt_male.geometry}
              material={materials.lambert1}
              material-metalness={0.1}
              dispose={null}>      

            {debug &&
            <group  position={[0, 0.04, 0.15]}>
              <PivotControls
                scale={0.3}
                activeAxes={[true, true, true]}
                onDrag={(local) => {                  
                  const currentPosition = new THREE.Vector3(0,0.04,0.15)                  
                  const position = new THREE.Vector3()
                  const scale = new THREE.Vector3()
                  const quaternion = new THREE.Quaternion()
                  local.decompose(position, quaternion, scale)

                  const finalPos = currentPosition.add(position);
                  const rotation = new THREE.Euler().setFromQuaternion(quaternion)
              
                  setXYZ([finalPos.x, finalPos.y, finalPos.z])
                  setRot([rotation.x, rotation.y, rotation.z])
                  // setScl([scale.x, scale.y, scale.z])
                }}
              />
            </group>
            }
            <Decal debug={debug} position={pos} rotation={rot} scale={scl} map={useTexture(image)} />

            {debug2 &&
            <group position={[0, -0.2, 0.15]}>
              <PivotControls
                scale={0.3}
                activeAxes={[true, true, true]}
                onDrag={(local) => {
                  const currentPosition = new THREE.Vector3(0,-0.2,0.15)                  
                  const position = new THREE.Vector3()
                  const scale = new THREE.Vector3()
                  const quaternion = new THREE.Quaternion()
                  local.decompose(position, quaternion, scale)

                  const finalPos = currentPosition.add(position);
                  const rotation = new THREE.Euler().setFromQuaternion(quaternion)
              
                  setXYZ2([finalPos.x, finalPos.y, finalPos.z])
                  setRot2([rotation.x, rotation.y, rotation.z])
                  // setScl([scale.x, scale.y, scale.z])
                }}
              />
            </group>
            }
            <Decal debug={debug2} position={pos2} rotation={rot2} scale={scl2} map={useTexture(image2)} />

          </mesh>
      {/* </group> */}
    </>
  )
}

export default ShirtApp