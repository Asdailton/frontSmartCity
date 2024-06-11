import './global.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"

// Importando as páginas

import { Routers } from './componentes/Rotas/Routers'

function App() {
  const id = 0
  return (
    <BrowserRouter>
      <Routers/>
    </BrowserRouter>
  );
}

export default App;
