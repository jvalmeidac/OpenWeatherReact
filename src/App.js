import React, { useState, useEffect } from "react";
import './App.css'
import api from "./services/api";

function App() {
  const key = "ba11e837904d6c52db0804ff65411068";

  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("Aguardando cidade...");
  const [description, setDescription] = useState("...");
  const [temp, setTemp] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [humidity, setHumidity] = useState(0);

  async function Get() {
    const response = await api.get(
      `weather?q=${city}&units=metric&APPID=${key}&lang=pt_br`
    );
    const result = response.data;
    setTemp(result.main.temp);
    setDescription(result.weather[0].description);
    setTempMin(result.main.temp_min);
    setTempMax(result.main.temp_max);
    setPressure(result.main.pressure);
    setHumidity(result.main.humidity);
    setCityName(result.name);   
  }

  useEffect(() => {
    Get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <div className="main">
      <div className="box">
        <div className="input-group">
          <input
            className="col-lg-6 text-center center"
            type="text"
            placeholder="Digite aqui o nome da cidade..."
            value={city}
            onChange={e => setCity(e.target.value)}
            target="_black"
          />
          <h1 className="col-lg-12 text-center">{cityName}</h1>
          <span className="small col-lg-12 text-center mb-2">{description.toUpperCase()}</span>

        </div>
        <div className="text-center">
          <span className="badge badge-primary">
            <h2 className="text-center">
              {Math.round(temp)}
              <span>°</span>
            </h2>
          </span>
          <div className="row">
            <div className="col-lg-6">Máxima: <span className="badge badge-danger">{Math.round(tempMax)}°</span></div>
            <div className="col-lg-6">Mínima: <span className="badge badge-info">{Math.round(tempMin)}°</span></div>
          </div>
          <div className="row">
            <div className="col-lg-6">Pressão Atmosférica: {pressure}</div>
            <div className="col-lg-6">Humidade: {humidity}</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
