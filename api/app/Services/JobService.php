<?php
namespace App\Services;
use App\Consts\JobConditionConsts;

class JobService {
    public function getJobConditions()
    {
        $city = JobConditionConsts::CITY;
        //mapでindexをリセットする。(連想配列の形になるとオブジェクトにされてしまうっぽい）
        $city = collect($city)->map(function($town, $index){
            return collect($town)->values();
        });
        return $city;
    }
}
