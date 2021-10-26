<?php

namespace App\Job\UseCase;

use App\Models\CorporationJoboffer;

final class GetAllPickUpJobsUseCase
{

    public function handle()
    {
         $pickUpJobs = CorporationJoboffer::with('favorites.users')
            ->getPickUpJobs()
            ->orderBy('id', 'desc')
            ->get();
        return $pickUpJobs;
    }
}
