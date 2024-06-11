
import { TemperaturaChart } from "../componentes/TemperaturaChart";
import { Outlet } from "react-router-dom";
import styles from './DashboardContent.module.css'
import { LuminosidadeChart } from "../componentes/LuminosidadeChart";
import { UmidadeChart } from "../componentes/UmidadeChart";
import { ContadorChart } from "../componentes/ContadorChart";

export function DashboardContent() {
    return (
      <div className={styles.conteiner}>
        <h1>Dashboard <span>Sensores </span></h1>

     
        <TemperaturaChart />
        <LuminosidadeChart/>
        <UmidadeChart/>
        <ContadorChart/>
        <Outlet/>
      </div>
    
      
    );
  }