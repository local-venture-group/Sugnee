<?php

namespace App\Http\Controllers\Api\User;

use App\Consts\JobConditionConsts;
use App\Http\Controllers\Controller;
use App\Http\Resources\JobResource;
use App\Job\UseCase\GetOmJobofferCrawledUseCase;
use App\Job\UseCase\GetOmJobofferNotOriginalUseCase;
use App\Job\UseCase\GetOmJobofferOriginalUseCase;
use App\Models\CorporationJoboffer;
use App\Models\Favorite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\VarDumper\Cloner\Data;

class PagesController extends Controller
{
    public function top()
    {
        // dd(Storage::files('public/users/'));
        // dd(Storage::disk('public')->path('22c128fd377344cad5f35dd5184257b8.png'));
        dd(Storage::disk('public')->url('22c128fd377344cad5f35dd5184257b8.png'));
        //TODO: 2種類のデータを返す

        //     ②注目記事一覧
        //     ③OM独自求人
        // $omCrawledUseCase = new GetOmJobofferCrawledUseCase();
        // $omCrawledJoboffers = $omCrawledUseCase->handle();

        //TODO: ここも、配列はそのうち一つにまとめる？　typeもつける？
        $omOriginalUseCase = new GetOmJobofferOriginalUseCase();
        $omOriginalJoboffers = $omOriginalUseCase->handle();
        return JobResource::collection($omOriginalJoboffers)->toJson();
        // return $omOriginalJoboffers;
    }


}
