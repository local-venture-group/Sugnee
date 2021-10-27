<?php

namespace App\Job\UseCase;

use App\Models\CorporationJoboffer;

final class GetOmJobofferNotOriginalUseCase
{

    public function handle()
    {
          //OM求人(ハロワインディード)取得,返却
        return
            CorporationJoboffer::find()
            ->scopeGetOriginalJobs()
            ->get();


    }
}
