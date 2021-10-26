<?php

namespace App\Job\UseCase;

use App\Models\CorporationJoboffer;

final class GetPickUpJobLimitUseCase
{

    public function handle($limit)
    {
        $pickUpJobs = CorporationJoboffer::with('favorites.users')
        ->getPickUpJobs()
        ->take($limit)
        ->orderBy('id', 'desc')
        ->get();
        return $pickUpJobs;
    }
}
