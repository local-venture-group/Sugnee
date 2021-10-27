<?php

namespace App\Job\UseCase;

use App\Models\CorporationJoboffer;

final class GetOmJobofferOriginalUseCase
{

    public function handle($limit)
    {
        //OM求人(独自)取得
        return
            CorporationJoboffer::find()
            ->getOriginalJobs()
            ->get();
    }
}
