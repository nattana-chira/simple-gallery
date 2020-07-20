<?php

namespace App\Http\Controllers;

use App\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Image;

class ImageController extends Controller
{
    public function getImages(Request $request) 
    {
        return response()->json([
            'images' => Auth::user()->images
        ]);
    }

    public function uploadImage(Request $request)
    {
        try {
            $this->validate($request, [
                'uploadfile' => 'mimes:jpg,jpeg,png|file|max:10240'
            ]);

            $path = 'images/' . uniqid('upload-image') . '.' . $request->uploadfile->getClientOriginalExtension();
            Image::make($request->uploadfile)->save(public_path($path));
            Auth::user()->images()->create([
                'path' => $path
            ]);

            return response()->json([
                'path' => $path
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errorMsg' => Arr::get($e->errors(), 'uploadfile.0')
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'errorMsg' => $e->getMessage()
            ], 400);
        }
    }
}
