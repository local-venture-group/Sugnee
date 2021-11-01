<?php

namespace App\Models;

use App\Consts\JobConditionConsts;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\MessageRoom;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Carbon\Carbon;
class CorporationJoboffer extends Model
{

    use HasFactory;

    protected $connection = 'ats';



    protected $table = 'corporation_joboffer';

    protected $casts = [

    ];


    public function favorites() :HasMany
    {
        return $this->hasMany(Favorite::class, 'corporation_joboffer_id');
    }
    public function favoritedByUsers() :BelongsToMany
    {
        return $this->belongsToMany(User::class, 'favorites', 'corporation_joboffer_id')->withTimestamps();
    }
    public function offerUsers() :BelongsToMany
    {
        return $this->belongsToMany(User::class, 'offers')->withTimestamps()->withPivot('status', 'type');
    }
    public function appliedByUsers() :BelongsToMany
    {
        return $this->belongsToMany(User::class, 'applies')->withTimestamps()->withPivot('is_offer');
    }
    public function rooms() :HasMany
    {
        return $this->hasMany(MessageRoom::class);
    }
    public function corporationCompany()
    {
        return $this->belongsTo(CorporationCompany::class, 'company_id');
    }
    public function corporationCompanyschedules()
    {
        return $this->hasMany(CorporationCompanyschedule::class, 'joboffer_id');
    }


    //OMクローリング求人に絞る
    public function scopeGetCrawledJobs($query)
    {
        return $query->where('is_crawled', JobConditionConsts::TYPE_OF_JOB['OMクローリング求人']);
    }
    //OM独自求人求人に絞る
    public function scopeGetOriginalJobs($query)
    {
        return $query->where('is_crawled', JobConditionConsts::TYPE_OF_JOB['OM独自求人']);
    }
    //キーワードで絞る
    public  function scopeWhereKeyword($query, $keyword)
    {

        if (empty($keyword)) {
            return $query;
        }
        return  $query->where(function ($query) use ($keyword) {
            foreach ($keyword as $word) {
                $query->orWhere('job_description', 'like', '%' . $word . '%')
                    ->orWhere('city', 'like', '%' . $word . '%')
                    ->orWhere('company_name', 'like', '%' . $word . '%');
                    // ->orWhere('work_type', 'like', '%' . $word . '%');
                    // ->orWhere('job_type', 'like', '%' . $word . '%')
                    // ->orWhere('hiring_system', 'like', '%' . $word . '%');

            }
        });
    }
    //住所検索
    public function scopeSearchAddress($query, $city)
    {
        //$request->cityのidに紐付いた町の名前と、cityプロパティの名前を部分一致検索で絞り込む
        if (empty($city)) {
            return $query;
        }
        return $query->where(function ($query) use ($city) {
            foreach ($city as $val) {
                $query->orWhere('city', 'like', '%' . $val . '%');
            }
        });
    }
    //求人種別検索
    public function scopeSearchHiringSystem($query, $hiringSystem)
    {
        if (empty($hiringSystem)) {
            return $query;
        }
        return $query->whereIn('hiring_system', $hiringSystem);
    }

    //業種検索
    public function scopeSearchWorkType($query, $workType)
    {
        if (empty($workType)) {
            return $query;
        }
        return $query->whereIn('work_type', $workType);
    }
    //期間検索
    public function scopeSearchPeriod($query, $period)
    {

        if(empty($period)){
            return $query;
        }
        return $query->whereDate('created_at', '>=', Carbon::today()->subDay($period));

    }



}
