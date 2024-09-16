import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, position, onClick }) {
  const gltf = useGLTF(url);
  return (
    <primitive
      object={gltf.scene}
      position={position}
      scale={0.5}
      onClick={onClick}
    />
  );
}

function Scene() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null); // Track selected model
  const sceneRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const blobUrl = URL.createObjectURL(new Blob([event.target.result]));
      const newModel = {
        id: models.length, // Assign an id to track models
        url: blobUrl,
        position: [Math.random() * 4 - 2, 0, Math.random() * 4 - 2],
      };
      setModels((prevModels) => [...prevModels, newModel]);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleModelClick = (model) => {
    setSelectedModel(model);
  };

  const handlePositionChange = (axis, value) => {
    if (selectedModel) {
      setModels((prevModels) =>
        prevModels.map((model) =>
          model.id === selectedModel.id
            ? {
                ...model,
                position: [
                  axis === 'x' ? value : model.position[0],
                  axis === 'y' ? value : model.position[1],
                  axis === 'z' ? value : model.position[2],
                ],
              }
            : model
        )
      );
    }
  };

  return (
    <div
      style={{ width: '100vw', height: '100vh' }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Canvas ref={sceneRef} camera={{ position: [0, 2, 5] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {/* Render all models */}
        {models.map((model) => (
          <Model
            key={model.id}
            url={model.url}
            position={model.position}
            onClick={() => handleModelClick(model)}
          />
        ))}

        <OrbitControls />
      </Canvas>

      {/* Control Panel for Selected Model */}
      {selectedModel && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px',
            backgroundColor: 'rgba(255,255,255,0.9)',
          }}
        >
          <h3>Move Model</h3>
          <div>
            <label>
              X:{" "}
              <input
                type="number"
                value={selectedModel.position[0]}
                onChange={(e) =>
                  handlePositionChange('x', parseFloat(e.target.value))
                }
              />
            </label>
          </div>
          <div>
            <label>
              Y:{" "}
              <input
                type="number"
                value={selectedModel.position[1]}
                onChange={(e) =>
                  handlePositionChange('y', parseFloat(e.target.value))
                }
              />
            </label>
          </div>
          <div>
            <label>
              Z:{" "}
              <input
                type="number"
                value={selectedModel.position[2]}
                onChange={(e) =>
                  handlePositionChange('z', parseFloat(e.target.value))
                }
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Test() {
  return <Scene />;
}
