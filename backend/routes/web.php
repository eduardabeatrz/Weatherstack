<?php


use App\Http\Controllers\WeatherController;


Route::get('/weather/{city}', [WeatherController::class, 'getWeatherByCity']);  // Buscar previsão por cidade
Route::post('/weather/save', [WeatherController::class, 'saveWeather']);        // Salvar previsão no histórico
Route::get('/weather/history', [WeatherController::class, 'getHistory']);       // Obter histórico de cidades
Route::post('/weather/compare', [WeatherController::class, 'compareWeather']);  // Comparar previsões de duas cidades
Route::post('/weather/save', [WeatherController::class, 'save']);