<?php

namespace App\Job\UseCase;

use App\Models\CorporationJoboffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
final class SearchJoboffersOmNotOriginalUseCase
{

    public function handle(Request $request, int $limit)
    {
        //OM(ハロワ、indeed)求人を取得し、返却

        $corporationJoboffers = CorporationJoboffer::with('favorites')
            ->whereKeyword($request->keyword)
            ->searchAddress($request->city)
            ->searchHiringSystem($request->hiring_system)
            ->searchPeriod($request->period)
            ->searchWorkType($request->work_type)
            ->getCrowledJobs()
            ->orderBy('created_at', 'desc')
            ->take($limit)
            ->get();

        return $corporationJoboffers;
    }
}
