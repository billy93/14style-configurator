import React from 'react';
import { useSnapshot } from 'valtio';

import state from '../store';

const LogoControls = () => {
  const snap = useSnapshot(state);

  const handlePositionChange = (type, index, value) => {
    if (type === 'front') {
      state.frontLogoPosition[index] = value;
    } else if (type === 'back') {
      state.backLogoPosition[index] = value;
    }
  };

  const handleScaleChange = (type, value) => {
    if (type === 'front') {
      state.frontLogoScale = value;
    } else if (type === 'back') {
      state.backLogoScale = value;
    }
  };

  const handleRotationChange = (index, value) => {
    state.frontLogoRotation[index] = value;
  };

  return (
    <div className="absolute left-full ml-3">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">FX:</span>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handlePositionChange('front', 0, snap.frontLogoPosition[0] - 0.01)}
          >
            -
          </button>
          <span>{snap.frontLogoPosition[0].toFixed(2)}</span>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handlePositionChange('front', 0, snap.frontLogoPosition[0] + 0.01)}
          >
            +
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">FY:</span>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handlePositionChange('front', 1, snap.frontLogoPosition[1] - 0.01)}
          >
            -
          </button>
          <span>{snap.frontLogoPosition[1].toFixed(2)}</span>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handlePositionChange('front', 1, snap.frontLogoPosition[1] + 0.01)}
          >
            +
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">FZ:</span>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handlePositionChange('front', 2, snap.frontLogoPosition[2] - 0.01)}
          >
            -
          </button>
          <span>{snap.frontLogoPosition[2].toFixed(2)}</span>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handlePositionChange('front', 2, snap.frontLogoPosition[2] + 0.01)}
          >
            +
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">FS:</span>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handleScaleChange('front', snap.frontLogoScale - 0.01)}
          >
            -
          </button>
          <span>{snap.frontLogoScale.toFixed(2)}</span>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handleScaleChange('front', snap.frontLogoScale + 0.01)}
          >
            +
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">FR:</span>

          x<input type="number" step="0.1" className={"w-10"} value={snap.frontLogoRotation[0]}  onChange={(e) => handleRotationChange(0, parseFloat(e.target.value))}></input>
          y<input type="number" step="0.1" className={"w-10"} value={snap.frontLogoRotation[1]} onChange={(e) => handleRotationChange(1, parseFloat(e.target.value))}></input>
          z<input type="number" step="0.1" className={"w-10"} value={snap.frontLogoRotation[2]} onChange={(e) => handleRotationChange(2, parseFloat(e.target.value))}></input>
        </div>
      </div>

      {/* <div className="flex flex-col space-y-2 mt-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">BX:</span>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handlePositionChange('back', 0, snap.backLogoPosition[0] - 0.01)}
          >
            -
          </button>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handlePositionChange('back', 0, snap.backLogoPosition[0] + 0.01)}
          >
            +
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">BY:</span>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handlePositionChange('back', 1, snap.backLogoPosition[1] - 0.01)}
          >
            -
          </button>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handlePositionChange('back', 1, snap.backLogoPosition[1] + 0.01)}
          >
            +
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">BZ:</span>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handlePositionChange('back', 2, snap.backLogoPosition[2] - 0.01)}
          >
            -
          </button>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handlePositionChange('back', 2, snap.backLogoPosition[2] + 0.01)}
          >
            +
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">BS:</span>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handleScaleChange('back', snap.backLogoScale - 0.01)}
          >
            -
          </button>
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={() => handleScaleChange('back', snap.backLogoScale + 0.01)}
          >
            +
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default LogoControls;
