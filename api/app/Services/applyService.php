<?php
namespace App\Services;

use Illuminate\Support\Str;

class applyService {
    //面接日程レコード用の配列を生成する。
    public function createScheduleArray($datetime, $jobofferId)
    {

        $scheduleArray = [];
        $schedulePreferred = collect(['preferred_first', 'preferred_second', 'preferred_third']);
        $schedulePreferred->each(function($preferred, $key) use (&$scheduleArray, $datetime, $jobofferId) {
            $scheduleArray[$preferred] = '';
            if(!empty($datetime[$preferred . '_date']) && !empty($datetime)) {
                $scheduleArray[$preferred] = $datetime[$preferred . '_date'] . ' ' . $datetime[$preferred . '_time'];
            }
        });
        $scheduleArray['temp_id'] = Str::uuid()->toString();
        //初期ステータスは未対応
        $scheduleArray['status'] = 0;

        return $scheduleArray;
    }
}
