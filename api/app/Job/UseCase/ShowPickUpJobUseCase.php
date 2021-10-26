<?php

namespace App\Job\UseCase;

use App\Models\CorporationJoboffer;

final class ShowPickUpJobUseCase
{

    public function handle(CorporationJoboffer $corporationJoboffer)
    {
        if ($corporationJoboffer->is_pickup) {
            return  $corporationJoboffer;
        }
        return response()->json(403);
    }
}
