<?php
namespace App\Services;

use Illuminate\Support\Str;

class applyService {
    //面接日程レコード用の配列を生成する。
    public function createScheduleArray($request, $jobofferId)
    {

        //$requestにはユーザーの希望面接日時が入っている。
        //$jobofferIdには求人IDが入っている。
        $scheduleArray = [];
        $schedulePreferred = collect(['preferred_first', 'preferred_second', 'preferred_third']);
        foreach ($schedulePreferred as $preferred){
            $scheduleArray[$preferred] = '';

            //ユーザーの面接希望の第n希望の日と、求人の第n希望の時間がどちらも空でなければ
            if(!empty($request[$preferred . '_date']) && !empty($request[$preferred . '_time'])) {

                $scheduleArray[$preferred] = $request[$preferred . '_date'] . ' ' . $request[$preferred . '_time'] . ':00';
            }
        }


        $scheduleArray['temp_id'] = Str::uuid()->toString();
        //初期ステータスは未対応
        $scheduleArray['status'] = 0;
        $scheduleArray['joboffer_id'] = $jobofferId;
        $scheduleArray['route'] = '/';
        return $scheduleArray;
    }
}
