<?php

namespace App\Job\UseCase;

use App\Consts\JobConditionConsts;
use App\Models\CorporationJoboffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class SearchJoboffersCrawledUseCase
{

    public function handle(Request $request, int $limit)
    {
        //OM(ハロワ、indeed)求人を取得し、返却

        $corporationJoboffers = CorporationJoboffer::with('favorites')
            ->getCrawledJobs()
            ->whereKeyword($request->keyword)
            ->searchAddress($request->city)
            ->searchHiringSystem($request->hiring_system)
            ->searchPeriod($request->period)
            ->searchWorkType($request->work_type)
            ->orderBy('created_at', 'desc')
            ->take($limit)
            ->get();
            $corporationJoboffers['type_of_job'] = array_keys(JobConditionConsts::TYPE_OF_JOB, 'OMクローリング求人');
        // $corporationJoboffers->append('type_of_job')->toArray();
        // $corporationJoboffers = $corporationJoboffers->each(function($corporationJoboffer){
        //     return $corporationJoboffer['type_of_job'] = $corporationJoboffer['type_of_job'][0];
        // });
        return $corporationJoboffers;
    }
}
