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
use App\Models\CorporationJoboffer;
use Illuminate\Http\Request;
use App\Models\Job;
use App\Providers\ApplyServiceProvider;
use App\Services\applyService;
use App\Services\JobService;
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
    //OMオリジナル求人に応募するときのアクション
    public function applyOmOriginalJoboffer(
        Request $request,
        CorporationJoboffer $corporationJoboffer ,
        CorporationApplicant $applicant,
        applyService $applyService
    )
    {
        dd($request->all());
        //ここから応募処理を書く

        $applicant = $applicant->getApplicant(Auth::guard('users')->id);

        //ユーザーの面接申込日データを作成
        $scheduleArray = $applyService->createScheduleArray($request, $corporationJoboffer->id);
    }
}
