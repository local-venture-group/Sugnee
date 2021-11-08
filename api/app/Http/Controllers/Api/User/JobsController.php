<?php

namespace App\Http\Controllers\Api\User;

use App\Consts\JobConditionConsts;
use App\Http\Controllers\Controller;
use App\Http\Resources\JobResource;
use App\Job\UseCase\SearchJoboffersCrawledUseCase;
use App\Job\UseCase\SearchJoboffersOmNotOriginalUseCase;
use App\Job\UseCase\SearchJoboffersOmOriginalUseCase;
use App\Job\UseCase\SearchJoboffersUseCase;
use App\Models\CorporationApplicant;
use App\Models\CorporationCompanyschedule;
use App\Models\CorporationJoboffer;
use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\User;
use App\Providers\ApplyServiceProvider;
use App\Services\applyService;
use App\Services\JobService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class JobsController extends Controller
{
    private $limit;

    public function showJoboffer(CorporationJoboffer $corporationJoboffer)
    {

        return collect(new JobResource($corporationJoboffer));
    }
    public function searchJobOffers(Request $request)
    {
        $this->limit = 10;
        //ダイエット
        if (!(empty($request->query() || empty(Auth::guard('users'))))) {
            //ここにユーザーの検索条件を保存する処理を書く(メソッドを作り呼び出す)
        }

        //OM求人(独自取得)
        $useCase = new SearchJoboffersOmOriginalUseCase();
        $omOriginalJoboffers = $useCase->handle($request, $this->limit);

        //OM求人(ハロワ、indeed)取得
        $useCase = new SearchJoboffersCrawledUseCase();
        $omCrawledJoboffers = $useCase->handle($request, $this->limit);

        //返し方はまた、話し合って、どうするか決める。
        return [
            $omOriginalJoboffers,
            $omCrawledJoboffers
        ];
        // return JobResource::collection($corporationJoboffers)->toJson();
    }
    public function getConditions(JobService $jobService)
    {
        return [
            'city' => $jobService->getJobConditions(),
            'work_type' => JobConditionConsts::WORK_TYPES,
        ];
    }
    public function applyOm(CorporationJoboffer $corporationJoboffer)
    {
        //当該求人を取得
        $corporationJoboffer = CorporationJoboffer::with('corporationApplicantSchedules.corporationApplicant', 'corporationCompany.authUser')
            ->where('id', $corporationJoboffer->id)
            ->first();
        $user = User::findOrFail(1);
        //申込済みかどうかを判定して返す。
        $isApplied = $corporationJoboffer->isAlreadyApplied($corporationJoboffer, $user);
        //申込済みなら、申込済みのメッセージを返す


        //企業の面接日時の候補を取得する。
        $candidateDatetimes = CorporationCompanyschedule::where([
            [
                'company_id',  $corporationJoboffer->company_id,
            ],
            [
                'start_time' , '>' , now(),
            ]
            ])
            ->get();
        //面接日時の候補が存在してなければ、応募完了画面へと遷移する。
        if(empty($candidateDatetimes)){
            //応募完了画面へと遷移させる。
        }
        //30分ごとに、start_time end_timeを区切る。
        $result = [];
        foreach($candidateDatetimes as $candidateDatetime){
            $start_time = Carbon::parse($candidateDatetime->start_time);

            //終了時刻から１時間を引く。
            $end_time = Carbon::parse($candidateDatetime->end_time)->subMinute(60);
            //開始時刻から終了時刻までを30分おきに区切る。
            while ($start_time->lte($end_time)) {
                //start_timeとend_timeの間を30分おきに区切る。
                $result[] = $start_time->toDateTimeString();
                $start_time = $start_time->addMinute(30);
            }
        }
        //面接日時の候補は$resultに格納されている。
        if(empty($candidateDatetimes)){
            //企業が面接日程を入力していない場合は、応募完了画面へと遷移する・
        }


        //面接日時の候補が存在していれば、面接日時の候補を返す。

    }
    //OMオリジナル求人に応募するときのアクション
    public function applyOmOriginalJoboffer(
        Request $request,
        CorporationJoboffer $corporationJoboffer ,
        CorporationApplicant $applicant,
        applyService $applyService
    )
    {


        //ここから応募処理を書く

        $applicant = $applicant->getApplicant(Auth::guard('users')->id);

        //ユーザーの面接申込日データを作成
        $scheduleArray = $applyService->createScheduleArray($request, $corporationJoboffer->id);
    }
}
