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
    public function companyJoboffers(FrikuCompany $frikuCompany)
    {
        // 疑問点 : 1 該当企業の、全ての求人を取得するという認識だったが、それで間違いないか。
        //  もし 全ての求人を取得するのであれば、
        //     A 企業データ.Fリク求人データ => [{求人},{求人},{求人}]、
        //     B [{求人},{求人},{求人}]
        //  ABのどちらの形で返したほうがよいか。

        // *現在はAの形にしている。どちらのパターンも作ったので、やりやすい方に。
        $pickUpCompany = $frikuCompany->with('frikuJoboffers')->first();
        return collect(new FrikuCompanyResource($pickUpCompany));

        // $joboffers = $pickUpCompany->frikuJoboffers;

        // return JobResource::collection($joboffers)->toJson(JSON_UNESCAPED_UNICODE);
    }
}
