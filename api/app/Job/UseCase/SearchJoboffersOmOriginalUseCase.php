<?php

namespace App\Job\UseCase;

use App\Models\CorporationJoboffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
final class SearchJoboffersOmOriginalUseCase
{

    public function handle(Request $request, int $limit)
    {
       //OM独自求人を取得し、返却

        $omOriginalJoboffers = CorporationJoboffer::with('favorites')
            ->getOriginalJobs()
            ->whereKeyword($request->keyword)
            ->searchAddress($request->city)
            ->searchHiringSystem($request->hiring_system)
            ->searchPeriod($request->period)
            ->searchWorkType($request->work_type)
            ->orderBy('created_at', 'desc')
            ->take($limit)
            ->get();
            $omOriginalJoboffers->append('type_of_job')->toArray();
            $omOriginalJoboffers = $omOriginalJoboffers->each(function($omOriginalJoboffer){
                return $omOriginalJoboffer['type_of_job'] = $omOriginalJoboffer['type_of_job'][0];
            });

        return $omOriginalJoboffers;
    }
}
