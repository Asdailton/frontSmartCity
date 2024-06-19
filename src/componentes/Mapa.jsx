import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Definir um ícone personalizado com caminhos absolutos
const customIcon = new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/marker-icon.png`,
    iconRetinaUrl: `${process.env.PUBLIC_URL}/marker-icon-2x.png`,
    shadowUrl: `${process.env.PUBLIC_URL}/marker-shadow.png`,
    iconSize: [25, 41],  // Tamanho do ícone
    iconAnchor: [12, 41],  // Ponto do ícone que estará ancorado à posição do marcador
    popupAnchor: [1, -34],  // Ponto do popup em relação ao ponto ancorado do ícone
    shadowSize: [41, 41],  // Tamanho da sombra
});

export default function Mapa({ pontos }) {
    const [mapaInicializado, setMapaInicializado] = useState(false);

    useEffect(() => {
        // Marcar o mapa como inicializado assim que os pontos estiverem carregados
        if (pontos.length > 0) {
            setMapaInicializado(true);
        }
    }, [pontos]);

    // Calcular o centro das localizações
    const centro = calcularCentro(pontos);

    // Definir o nível de zoom adequado com base na escala dos pontos
    const zoomLevel = calcularZoomLevel(pontos);

    return (
        <MapContainer
            style={{ height: '500px', width: '100%' }}
            center={centro}
            zoom={zoomLevel}
            whenCreated={(map) => {
                // Ajustar o nível de zoom para um nível mais detalhado
                if (mapaInicializado) {
                    map.setView(centro, zoomLevel);
                }
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {pontos.map((ponto, index) => (
                <Marker key={index} position={[ponto.latitude, ponto.longitude]} icon={customIcon}>
                    <Popup>
                        <strong>Tipo:</strong> {ponto.tipo}<br />
                        <strong>Localização:</strong> {ponto.localizacao}<br />
                        <strong>Latitude:</strong> {ponto.latitude}<br />
                        <strong>Longitude:</strong> {ponto.longitude}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

// Função para calcular o centro dos pontos
function calcularCentro(pontos) {
    const somaLatitudes = pontos.reduce((acc, ponto) => acc + ponto.latitude, 0);
    const somaLongitudes = pontos.reduce((acc, ponto) => acc + ponto.longitude, 0);
    const centroLat = somaLatitudes / pontos.length;
    const centroLng = somaLongitudes / pontos.length;
    return [centroLat, centroLng];
}

// Função para calcular o nível de zoom com base na escala dos pontos
function calcularZoomLevel(pontos) {
    const latitudes = pontos.map(ponto => ponto.latitude);
    const longitudes = pontos.map(ponto => ponto.longitude);
    const maxLat = Math.max(...latitudes);
    const minLat = Math.min(...latitudes);
    const maxLng = Math.max(...longitudes);
    const minLng = Math.min(...longitudes);

    // Calcular a distância entre os pontos mais distantes (em graus)
    const distanciaLat = maxLat - minLat;
    const distanciaLng = maxLng - minLng;

    // Converter a distância para metros
    const distanciaMetros = Math.sqrt(
        Math.pow(distanciaLat * 111000, 2) + Math.pow(distanciaLng * 111000, 2)
    );

    // Ajustar o nível de zoom com base na distância em metros
    // Aqui estou usando um fator de escala arbitrário para ajustar o nível de zoom
    const fatorEscala = 0.1; // Ajuste conforme necessário
    const zoomLevel = 18 - Math.log2(distanciaMetros) * fatorEscala;
    return zoomLevel;
}
