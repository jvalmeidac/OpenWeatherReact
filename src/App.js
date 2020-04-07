import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import api from "./services/api";

function App() {
  const key = "Sua key da api";

  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("Digite sua cidade");
  const [temp, setTemp] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [description, setDescription] = useState("");

  const dataFormat = d => {
    let meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ];
    let dias = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado"
    ];
    let dia = dias[d.getDay()];
    let data = d.getDate();
    let mes = meses[d.getMonth()];
    let ano = d.getFullYear();
    return `${dia}, ${data} ${mes} ${ano}`;
  };

  async function getDatas() {
    const response = await api.get(
      `weather?q=${city}&units=metric&APPID=${key}&lang=pt_br`
    );
    const result = response.data;
    setTemp(result.main.temp);
    setTempMin(result.main.temp_min);
    setTempMax(result.main.temp_max);
    setPressure(result.main.pressure);
    setHumidity(result.main.humidity);
    setDescription(result.weather[0].description);
    setCityName(result.name);
  }

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div>
      <h1>{cityName}</h1>
      <div>
        <input
          placeholder="Digite aqui o nome da cidade..."
          value={city}
          onChange={e => setCity(e.target.value)}
          target="_black"
        />
        <FaSearch size={30} color="#e0e0e6" onClick={() => getDatas()} />
        <div class="date">{dataFormat(new Date())}</div>
        <h2>
          {Math.round(temp)}
          <span>°</span>
        </h2>
        <h6>{description}</h6>
        <h6>Máxima: {Math.round(tempMax)}°</h6>
        <h6>Mínima: {Math.round(tempMin)}°</h6>
        <h6>Pressão Atmosférica: {pressure}</h6>
        <h6>Humidade: {humidity}</h6>
      </div>
    </div>
  );
}

export default App;
