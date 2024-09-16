import { useState } from 'react';
import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import Test from './Test';
import state from './store';
import { useSnapshot } from 'valtio';

function App() {
  const snap = useSnapshot(state);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [point, setPoint] = useState()

  // Function to handle right-click and show the context menu
  const handleRightClick = (x, y, point) => {
    setContextMenuPosition({ x, y });
    setPoint(point)
    setShowContextMenu(true);
  };

  // Function to handle image selection from the context menu
  const handleSelectImage = (image) => {
    if(image == "image1"){
      state.decals.push(
        {
          position: point,
          scale: 0.15,
          rotation: [0,0,0],
          active: false,
          image: "./threejs.png"
        }
      )
    }
    else if(image == "image2"){
      state.decals.push({
        position: point,
        scale: 0.15,
        rotation: [0,0,0],
        active: false,
        image: "./starbucks.png"
      })
    }
    // {
    //   position: [ 0, 0.04, 0.15 ],
    //   scale: 0.15,
    //   rotation: [0,0,0],
    //   active: false,
    //   image: "./threejs.png"
    // },
    // {
    //   position: [ 0, -0.2, 0.15 ],
    //   scale: 0.15,
    //   rotation: [0,0,0],
    //   active: false,
    //   image: "./starbucks.png"
    // },
    // Logic to apply decal or pass it to Cup component
    setShowContextMenu(false); // Close context menu
  };

  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas onRightClick={handleRightClick} />
      <Customizer />
      {/* <Test/> */}

       {/* Context Menu in regular HTML */}
       {showContextMenu && (
        <div
          style={{
            position: 'absolute',
            top: `${contextMenuPosition.y}px`,
            left: `${contextMenuPosition.x}px`,
            backgroundColor: 'white',
            border: '1px solid black',
            zIndex: 1000,
            padding: '10px'
          }}
        >
          <div onClick={() => handleSelectImage('image1')}>Select Image 1</div>
          <div onClick={() => handleSelectImage('image2')}>Select Image 2</div>
        </div>
      )}
    </main>
  )
}

export default App
