import React, { useState, useEffect } from 'react';
import { Input, Button, Card, CardContent } from '@/components/ui';
import axios from 'axios';

export default function App() {
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [historico, setHistorico] = useState([]);
  const [previsao, setPrevisao] = useState(null);
  const [comparacao, setComparacao] = useState({ cidade1: '', cidade2: '', resultado: null });

  const buscarCidadePorCEP = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setCidade(response.data.localidade);
    } catch (error) {
      alert('Erro ao buscar cidade pelo CEP.');
    }
  };

  const buscarPrevisao = async () => {
    try {
      const response = await axios.get('http://api.weatherstack.com/current', {
        params: {
          access_key: 'SUA_API_KEY_WEATHERSTACK',
          query: cidade,
        },
      });
      setPrevisao(response.data);
      setHistorico((prev) => [...prev, { cidade, previsao: response.data }]);
    } catch (error) {
      alert('Erro ao buscar previsão do tempo.');
    }
  };

  const salvarPrevisao = async () => {
    try {
      await axios.post('http://localhost:8000/salvar', { cidade, previsao });
      alert('Previsão salva com sucesso!');
    } catch (error) {
      alert('Erro ao salvar previsão do tempo.');
    }
  };

  const compararPrevisoes = async () => {
    try {
      const response = await axios.post('http://localhost:8000/comparar', {
        cidades: [comparacao.cidade1, comparacao.cidade2],
      });
      setComparacao((prev) => ({ ...prev, resultado: response.data }));
    } catch (error) {
      alert('Erro ao comparar previsões.');
    }
  };

  return (
    <div className="p-4">
      <Card className="mb-4">
        <CardContent>
          <h1 className="text-xl mb-2">Consultar Previsão do Tempo</h1>
          <div className="mb-2">
            <Input
              placeholder="Digite o CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              className="mb-2"
            />
            <Button onClick={buscarCidadePorCEP}>Buscar Cidade</Button>
          </div>
          <div className="mb-2">
            <Input
              placeholder="Nome da cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="mb-2"
            />
            <Button onClick={buscarPrevisao}>Buscar Previsão</Button>
          </div>
          {previsao && (
            <div className="mt-4">
              <h2 className="text-lg">Previsão para {cidade}:</h2>
              <p>Temperatura: {previsao.current.temperature}°C</p>
              <p>Clima: {previsao.current.weather_descriptions.join(', ')}</p>
              <Button onClick={salvarPrevisao} className="mt-2">Salvar</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl mb-2">Histórico de Pesquisas</h2>
          <ul>
            {historico.map((item, index) => (
              <li key={index} className="mb-2">
                {item.cidade}: {item.previsao.current.temperature}°C - {item.previsao.current.weather_descriptions.join(', ')}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl mb-2">Comparar Previsões</h2>
          <div className="mb-2">
            <Input
              placeholder="Cidade 1"
              value={comparacao.cidade1}
              onChange={(e) => setComparacao((prev) => ({ ...prev, cidade1: e.target.value }))}
              className="mb-2"
            />
            <Input
              placeholder="Cidade 2"
              value={comparacao.cidade2}
              onChange={(e) => setComparacao((prev) => ({ ...prev, cidade2: e.target.value }))}
              className="mb-2"
            />
            <Button onClick={compararPrevisoes}>Comparar</Button>
          </div>
          {comparacao.resultado && (
            <div>
              <h3>Comparação:</h3>
              <p>{comparacao.resultado}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}