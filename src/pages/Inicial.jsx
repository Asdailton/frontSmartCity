import { Outlet } from 'react-router-dom'
import { Cabecalho } from '../componentes/Cabecalho' 
import { Home } from '../componentes/Home'
import { Lateral } from '../componentes/Lateral'
import estilos from './Inicial.module.css'
import { useLocation } from 'react-router-dom'


export function Inicial() {

   
  return (
    <div className={estilos.gridConteiner}>
      <Cabecalho/>
      <Lateral />
      <Outlet/>
      
     </div>
  )
}


