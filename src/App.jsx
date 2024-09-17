import { useEffect, useRef, useState } from 'react';
import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import Test from './Test';
import state from './store';
import { useSnapshot } from 'valtio';
import { useControls, button } from 'leva';

function App() {
  const snap = useSnapshot(state);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [point, setPoint] = useState()
  const [rotation, setRotation] = useState()
  const contextMenuRef = useRef(null); // Ref for the context menu

  const [, set] = useControls(() => (
    snap.decals.reduce((acc, decal, index) => {
      // console.log(decal.position)
      acc[`scale_${index}`] = {
        value: decal.scale,
        step: 0.01,
        min: 0.01,
        max: 0.5,
        onChange: (value) => {
          state.decals[index].scale = value;
        },
      };
      acc[`position_${index}`] = {
        value: decal.position,
        onChange: (value) => {
          state.decals[index].position = value;
        },
      };
      acc[`rotation_${index}`] = {
        value: decal.rotation,
        onChange: (value) => {
          state.decals[index].rotation = value;
        },
      };
      acc[`active_${index}`] = {
        value: decal.active,
        onChange: (value) => {
          state.decals[index].active = value;
        },
      };
      acc[`image_${index}`] = decal.image;
      acc[`delete_${index}`] = button(() => {
        // set({
        //   [`scale_${index}`]: 0.15,
        //   [`position_${index}`]: [0, 0, 0],
        //   [`rotation_${index}`]: [0, 0, 0],
        //   [`active_${index}`]: false,
        //   [`scale_${index}`]: {},        
        // })
        delete state.decals[index]
      });
      return acc;
    }, {})
  ), [snap])


  const openModal = () => {
    setShowContextMenu(true);
    document.body.classList.add('overflow-y-hidden');
  };

  const closeModal = () => {
    setShowContextMenu(false);
    document.body.classList.remove('overflow-y-hidden');
  };

  // Close modal on ESC press
  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  // Attach event listener for ESC key
  useState(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  // Function to handle right-click and show the context menu
  const handleRightClick = (x, y, point, rotation) => {
    setContextMenuPosition({ x, y });
    setPoint(point)
    setRotation(rotation)
    openModal()
  };

  // Effect to handle clicks outside of the context menu
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
  //       setShowContextMenu(false); 
  //     }
  //   };

  //   if (showContextMenu) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   } else {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [showContextMenu]);

  // Function to handle image selection from the context menu
  const handleSelectImage = (image) => {
    state.decals.push(
      {
        position: point,
        scale: 0.15,
        rotation: rotation,
        active: false,
        image: image.src
      }
    )

    closeModal();
    // let index = snap.decals.length - 1;
    // set({
    //   [`scale_${index}`]: 0.15,
    //   [`position_${index}`]: point,
    //   [`rotation_${index}`]: rotation,
    //   [`active_${index}`]: false,
    //   [`image_${index}`]: image.src,        
    // })
  };


  
  
  const ImageGallery = () => {

    const imageData = [
      {
        src: "./starbucks.png",
        alt: "Image 1",
      },
      {
        src: "./threejs.png",
        alt: "Image 2",
      },
      {
        src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMHx8bmF0dXJlfGVufDB8MHx8fDE2OTQwOTk3Mjl8MA&ixlib=rb-4.0.3&q=80&w=1080",
        alt: "Image 3",
      },
      {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080",
        alt: "Image 4",
      },
      // Add more image data as needed
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {imageData.map((image, index) => (
          <div key={index} className="group cursor-pointer relative">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => {handleSelectImage(image)}}>
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas onRightClick={handleRightClick} set={set}/>
      <Customizer />
       
       {/* {showContextMenu && (
        <div
          ref={contextMenuRef}
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
      )} */}

      <>
        {showContextMenu && (
          <div
            id="modelConfirm"
            className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4"
          >
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
              <div className="flex justify-end p-2">
                <h1>Select Accessories</h1>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <ImageGallery/>
            </div>
          </div>
        )}
      </>
    </main>
  )
}

export default App
