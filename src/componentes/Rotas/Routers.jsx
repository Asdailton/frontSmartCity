import { Routes, Route } from "react-router-dom";
import { Inicial } from "../../pages/Inicial";
import Login from "../../pages/LoginPage";
import { Home } from "../Home";
import Cadastro from "../../pages/Cadastro";
import { Sensor } from "../../pages/Sensor";
import { DashboardContent } from "../../pages/DashboardContent";
import { Localizacao } from "../Localizacao";

export function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="cadastro" element={<Cadastro />} />
      <Route path="inicial" element={<Inicial />}>
        <Route index element={<Home />} />
        <Route path="sensores" element={<Sensor />} />
        <Route path="dashboard" element={<DashboardContent />} />
        <Route path="mapa" element={<Localizacao />} />
        <Route path="cadastro" element={<Cadastro/>} />
        
      </Route>
    </Routes>
  );
}
