import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import Test from './Test';

function App() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas />
      <Customizer />
      {/* <Test/> */}
    </main>
  )
}

export default App
