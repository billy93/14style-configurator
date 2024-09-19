import { Canvas } from '@react-three/fiber'
import { Center } from '@react-three/drei';
import Shirt from './Shirt';
import CameraRig from './CameraRig';
import ShirtApp from './ShirtApp.jsx';
import ShirtWithDecal from '../ShirtWithDecal.jsx';

const CanvasModel = (props) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <CameraRig>
        <ShirtWithDecal onRightClick={props.onRightClick} set={props.set}/>
        {/* <Center> */}
          {/* <ShirtApp onRightClick={props.onRightClick} set={props.set}/> */}
        {/* </Center> */}
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel