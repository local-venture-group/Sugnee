<?php

namespace App\Http\Controllers\Api\User\Friku;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobResource;
use App\Models\FrikuCompany;
use Faker\Provider\ar_JO\Company;
use Illuminate\Http\Request;

class FrikuJobsController extends Controller
{
    //企業の求人一覧を取得
    public function companyJoboffers(FrikuCompany $frikuCompany)
    {
        $pickUpCompany = $frikuCompany->with('frikuJoboffers')->first();
        $joboffers = $pickUpCompany->frikuJoboffers;


        return JobResource::collection($joboffers)->toJson(JSON_UNESCAPED_UNICODE);
    }
}
