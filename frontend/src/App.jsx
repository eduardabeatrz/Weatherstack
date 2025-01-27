import React, { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container, Row, Col, Card, Button, Alert, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { FaHistory, FaBalanceScale, FaTrashAlt, FaSave, FaSearch } from "react-icons/fa";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityHistory, setCityHistory] = useState([]);
  const [error, setError] = useState("");
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [selectedCities, setSelectedCities] = useState([null, null]);
  const [videoFile, setVideoFile] = useState("sunny.mp4"); // Padrão de mídia por enquanto.

  // const handleSearch = (data) => {
  //   setWeatherData(data);
  
  //   // Puxando o arquivo a partir da descrição do clima.
  //   const weatherDescription = data.current.weather_descriptions[0].toLowerCase();
  
  //   if (weatherDescription.includes("sunny") || weatherDescription.includes("clear")) {
  //     setVideoFile("sunny.mp4");
  //   } else if (weatherDescription.includes("cloudy")) {
  //     setVideoFile("cloudy.mp4");
  //   } else if (weatherDescription.includes("rain")) {
  //     setVideoFile("rain.mp4");
  //   } else if (weatherDescription.includes("snow")) {
  //     setVideoFile("snow.mp4");
  //   } else {
  //     setVideoFile("sunny.mp4");
  //   }
  // };
  
  const handleSave = async (city, data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/weather/save", { city, data });
    } catch {
      setError("Erro ao salvar a previsão.");
    }
  };


  const handleAddCityToHistory = (city, data) => {
    setCityHistory((prev) => [...prev, { city, data }]);
  };


  const handleRemoveCard = (cityName) => {
    setCityHistory((prev) => prev.filter((item) => item.city !== cityName));
  };


  const toggleHistoryModal = () => setShowHistoryModal((prev) => !prev);
  const toggleComparisonModal = () => setShowComparisonModal((prev) => !prev);


  const handleSelectCity = (index, city) => {
    setSelectedCities((prev) => {
      const newSelection = [...prev];
      newSelection[index] = city;
      return newSelection;
    });
  };


  const renderComparison = () => {
    const [city1Name, city2Name] = selectedCities;
    if (!city1Name || !city2Name) return null;

    const city1 = cityHistory.find((item) => item.city === city1Name);
    const city2 = cityHistory.find((item) => item.city === city2Name);

    return (
      <Row className="mt-3">
        {[city1, city2].map((city, idx) => (
          <Col md={6} key={idx}>
            <Card.Body className="shadow bg-light-transparent">
              <h5>{city.city}</h5>
              <p>Temperatura: {city.data.current.temperature}°C</p>
              <p>Clima: {city.data.current.weather_descriptions.join(", ")}</p>
              <p>Humidade: {city.data.current.humidity}%</p>
              <p>Vento: {city.data.current.wind_speed} km/h</p>
            </Card.Body>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
    <Header />

    {/* Definindo um vídeo de tela de fundo. */}
    <video id="background-video" autoPlay loop muted>
      <source src={`../public/${videoFile}`} type="video/mp4" />
    </video>

      <Container className="mt-5">
        {/* Pesquisando pela cidade desejada. */}
        <Row className="mb-4">
          <Col>
            <Card.Body className="shadow bg-light-transparent">
              <WeatherForm 
                onSearch={setWeatherData} 
                onSave={handleAddCityToHistory} 
                onError={setError} 
                searchIcon={<FaSearch />} 
              />
            </Card.Body>
          </Col>
        </Row>

        {/* Trazendo as informações da cidade para o histórico. */}
        {weatherData && (
          <Row className="mb-4">
            <Col>
              <Card.Body className="shadow bg-light-transparent">
                <WeatherCard data={weatherData} />
                <Button onClick={() => handleAddCityToHistory(weatherData.location.name, weatherData)} className="mt-2 btn-dark">
                  Adicionar ao Histórico
                </Button>
              </Card.Body>
            </Col>
          </Row>
        )}

        {/* Opções de visualizar histórico e de comparar previsões. */}
        <Row className="mb-4">
          <Col className="d-flex justify-content-between">
            <Button variant="secondary" className="btn-dark" onClick={toggleHistoryModal}>
              <FaHistory />
            </Button>
            <Button variant="secondary" className="btn-dark" onClick={toggleComparisonModal}>
              <FaBalanceScale />
            </Button>
          </Col>
        </Row>

        {/* Modal de histórico de cidades. */}
        <Modal show={showHistoryModal} onHide={toggleHistoryModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Histórico de Cidades</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cityHistory.length > 0 ? (
              <Row>
                {cityHistory.map(({ city, data }, index) => (
                  <Col key={index} md={6}>
                    <Card className="shadow bg-light-transparent mb-3">
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">{city}</h5>
                        <div>
                          <Button onClick={() => handleSave(city, data)} className="mx-1 btn-dark" variant="primary">
                            <FaSave />
                          </Button>
                          <Button onClick={() => handleRemoveCard(city)} variant="danger" className="btn-red">
                            <FaTrashAlt />
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <p>Nenhuma cidade no histórico.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="btn-red" onClick={toggleHistoryModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para comparar previsões do tempo entre cidades do histórico. */}
        <Modal show={showComparisonModal} onHide={toggleComparisonModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Comparar Cidades</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {["Primeira Cidade", "Segunda Cidade"].map((label, index) => (
                <Col md={6} key={index} className="mb-3">
                  <Form.Group controlId={`citySelect${index}`}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedCities[index] || ""}
                      onChange={(e) => handleSelectCity(index, e.target.value)}
                    >
                      <option value="">Selecione uma cidade</option>
                      {cityHistory.map(({ city }) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              ))}
            </Row>
            {renderComparison()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={toggleComparisonModal} className="btn-red">
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Container>
      <Footer />
    </>
  );
}

export default App;
