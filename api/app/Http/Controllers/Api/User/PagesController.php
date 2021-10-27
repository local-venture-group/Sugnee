<?php

namespace App\Http\Controllers\Api\User;

use App\Consts\JobConditionConsts;
use App\Http\Controllers\Controller;
use App\Http\Resources\JobResource;
use App\Job\UseCase\GetAllPickUpJobsUseCase;
use App\Job\UseCase\GetPickUpJobLimitUseCase;
use App\Models\CorporationJoboffer;
use App\Models\Favorite;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\VarDumper\Cloner\Data;

class PagesController extends Controller
{
    public function top()
    {
        //TODO: 2種類のデータを返す

        //     ②注目記事一覧
        //     ③OM独自求人

    }


}
