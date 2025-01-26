<?php


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Weather;


class WeatherController extends Controller {

    public function save(Request $request) {

        try {

            # Para salvar o conteúdo no banco.
            $validated = $request->validate([
                'city' => 'required|string',
                'data' => 'required|array',
            ]);

            $weather = new Weather();
            $weather->city = $validated['city'];
            $weather->data = json_encode($validated['data']); 
            $weather->save();

        } catch (\Exception $e) {

            return response()->json([
                'error' => 'Erro',
            ], 500);

        }
    }
}
