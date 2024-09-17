import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isFrontLogoTexture: true,
  isBackLogoTexture: true,
  isFrontText: true,
  isBackText: true,
  isFullTexture: false,
  frontLogoDecal: './threejs.png',
  fullDecal: './texture.jpeg',

  decals: [
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
    // {
    //   position: [ 0, 0.04, 0.15 ],
    //   scale: 0.15,
    //   rotation: [0,0,0],
    //   active: false,
    //   image: "./threejs.png"
    // },
  ],
  frontLogoPosition: [ 0, 0.04, 0.15 ],
  frontLogoScale: 0.15,
  frontLogoRotation: [0, 0, 0],

  frontLogoPosition2: [ 0, -0.2, 0.15 ],
  frontLogoScale2: 0.15,
  frontLogoRotation2: [0, 0, 0],

  backLogoDecal: './threejs.png',
  backLogoPosition: [0, 0.04, -0.15],
  backLogoRotation: [0, Math.PI, 0],
  backLogoScale: 0.15,
  frontText: 'Front Text',
  frontTextPosition: [0, -0.04, 0.15],
  frontTextRotation: [0, 0, 0],
  frontTextFontSize: 0.1,
  frontTextScale: [0.15, 0.04, 0.1],
  frontTextFont: 'Arial',
  frontTextSize: 64,
  frontTextColor: 'black',
  backText: 'Back Text',
  backTextPosition: [0, -0.04, -0.15],
  backTextRotation: [0, Math.PI, 0],
  backTextFontSize: 0.1,
  backTextScale: [0.15, 0.04, 0.1],
  backTextFont: 'Arial',
  backTextSize: 64,
  backTextColor: 'white',
});

export default state;
