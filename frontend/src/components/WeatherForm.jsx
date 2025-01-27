
import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";


function WeatherForm({ onSearch, onSave, onError }) {
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Consultando a cidade a partir do CEP.
  const handleZipCodeChange = async (e) => {
    const value = e.target.value;
    setZipCode(value);

    // Verificando se o CEP possui a quantia correta de digitos.
    if (value.length === 8 && /^[0-9]{8}$/.test(value)) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
        if (response.data && response.data.localidade) {
          setCity(response.data.localidade); // Puxa direto a cidade desejada.
        } else {
          setCity("");
        }
      } catch (err) {
        onError("Não foi possível encontrar a cidade para esse CEP.");
      }
    } else if (value.length === 8) {
      onError("O CEP deve conter apenas números e 8 dígitos.");
    }
  };

  
  const handleSearch = async () => {
    if (!city) {
      onError("Por favor, informe uma cidade.");
      return;
    }

    setLoading(true);
    onError("");

    try {
      const res = await axios.get("https://api.weatherstack.com/current", {
        params: {
          access_key: "46d6fadcbf3e711381bff1af2c32de41", // Se não funcionar verificar na documentação novamente, pode ter atualizado ou estourado o limite de requisições. 
          query: city,
        },
      });

      if (res.data.error) {
        onError(res.data.error.info);
        setLoading(false);
        return;
      }

      onSearch(res.data);
      onSave(city, res.data);
      setLoading(false);

    } catch (err) {
      onError("Ocorreu um erro. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div>
      <Form>
        <Row className="align-items-center">
          <Col md={4}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Digite o CEP"
                value={zipCode}
                onChange={handleZipCodeChange}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Digite o nome da cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={zipCode.length === 8} // Desabilita o campo da cidade se o CEP já foi preenchido com a quantidade correta de digitos (validação acima).
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Button
              onClick={handleSearch}
              className="w-100 btn-dark"
              disabled={loading}
            >
              {loading ? "Buscando..." : "Buscar"}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}


export default WeatherForm;
