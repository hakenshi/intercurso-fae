<?php

namespace App\Http\Controllers;

use App\Models\Jogo;
use App\Models\Likes;
use Illuminate\Http\Request;

class LikesController extends Controller
{

    private function generateUserIdentifier(Request $request)
    {
        return hash('sha256', $request->ip() . $request->userAgent());
    }

    public function store(Request $request)
    {
        $identifier = $this->generateUserIdentifier($request);

        $data = $request->validate([
            'id_time' => 'required|integer|exists:times,id',
            'id_jogo' => 'required|integer|exists:jogos,id',
        ]);

        $jogo = Jogo::findOrFail($data['id_jogo']);

        $alreadyLiked = Likes::where("id_jogo", $data['id_jogo'])->where("user_identifier", $identifier)->exists();

        if ($alreadyLiked) {
            return response()->json([
                'message' => 'você já deu like em time nesse jogo.'
            ]);
        }
        else{
            Likes::create([
                'id_time' => $data['id_time'],
                'id_jogo' => $data['id_jogo'],
                'user_identifier' => $identifier,
            ]);
            if ($jogo->id_time_1 === $data['id_time']) {
                $jogo->likes_time_1 = $jogo->likes_time_1 + 1;
                $jogo->save();
            }
            if ($jogo->id_time_2 === $data['id_time']) {
                $jogo->likes_time_2 = $jogo->likes_time_2 + 1;
                $jogo->save();
            }
            return response()->json([
                'likes_time_1' => $jogo->likes_time_1,
                'likes_time_2' => $jogo->likes_time_2,
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Likes $likes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Likes $likes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Likes $likes)
    {
        //
    }
}
