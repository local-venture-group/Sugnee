<?php

namespace App\Http\Controllers\Api\User\Friku;

use App\Http\Controllers\Controller;
use App\Http\Resources\FrikuCompanyResource;
use App\Http\Resources\JobResource;
use App\Models\FrikuCompany;
use Faker\Provider\ar_JO\Company;
use Illuminate\Http\Request;

class FrikuJobsController extends Controller
{

    //企業の求人一覧を取得
    public function pickUpCompanyJoboffers(FrikuCompany $frikuCompany)
    {
        if(!$frikuCompany->is_pickup){
            return response()->json(['message' => 'pickUp企業の求人ではありません']);
        }
        $pickUpCompany = $frikuCompany->with('frikuJoboffers')->first();
        $pickUpJobs =  $pickUpCompany->frikuJoboffers;
        return JobResource::collection($pickUpJobs)->toJson();
        // return collect(new JobResource($pickUpJobs));
    }
    public function featureCompanyJoboffers(FrikuCompany $frikuCompany)
    {

        if($frikuCompany->is_pickup){
            return response()->json(['message' => '注目企業の求人ではありません']);
        }
        $featureCompany = $frikuCompany->with('frikuJoboffers')->first();
        $featureJobs =  $featureCompany->frikuJoboffers;
        return JobResource::collection($featureJobs)->toJson();
    }
}
