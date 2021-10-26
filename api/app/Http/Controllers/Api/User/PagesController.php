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
        //ダイエット
        $useCase = new GetPickUpJobLimitUseCase();
        $pickUpJobs = $useCase->handle(10);
        $res = JobResource::collection($pickUpJobs);
        return [
            'pickUpJobs' => $res,
        ];
    }
    public function allPickUpJobs()
    {
        //ダイエット
        $useCase = new GetAllPickUpJobsUseCase();
        $pickUpJobs = $useCase->handle();
        return JobResource::collection($pickUpJobs)->toJson();
    }

}
