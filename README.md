# WeatherStack
Este projeto tem como objetivo fornecer um serviço de previsões meteorológicas das cidades utiliziando a API Weatherstack. Trata-se da resolução do primeiro desafio FullStack enviado. Ele está organizado em duas partes principais: Backend e Frontend.

# Visão Geral
A estrutura do projeto de forma geral é feita de modo que possamos pesquisar pelo cep (API ViaCep) de uma cidade e retorna-la automaticamente (desde que esteja mapeada na API WeatherStack). Após a definição do CEP e da cidade, nos são retornados uma gama de dados referentes a previsão do tempo da cidade mencionada. É importante destacar que a API do tempo é completa e oferece uma variedade de informações relacionadas a isso, neste projeto não foram inclusas todas pois o intuito é demonstrar a manipulação correta dos dados.
Além das informações que nos são retornadas, é possível visualizar o histórico de cidades pesquisadas (incluso salvar as informações direto no banco de dados ou simplesmente excluir o registro do histórico da página). Também oferecemos a possibilidade de comparar 2 cidades presentes no histórico.

OBS: Estrutura responsiva. + A API WeatherStack nos disponibiliza apenas 100 requests para pesquisa, no momento atual, já foi utilizado 72% desse valor. Portanto, caso durante os próximos testes não retorne os dados do tempo, basta me comunicar para que possamos criar uma nova conta e nova chave de acesso.

# Tecnologias Utilizadas
O projeto foi criado separando o backend do frontend, garantindo dessa forma maior organização de código.
No backend, utilizamos PHP/Laravel, conforme requisito do desafio. No frontend, as escolhas foram HTML/CSS E Javascript (React), Bootstrap também facilitou o processo. Utilizamos AXIOS para comunicação entre front e back facilitando as requisições assincronas.

# GIFs e Prints Demonstrativos
![image](https://github.com/user-attachments/assets/00463ce0-ce15-469b-9ede-fc811ac6f596)
![msedge_Ly9LFcZZP2](https://github.com/user-attachments/assets/d41c116d-715d-416b-9dd0-6ad777ed8d6a)

