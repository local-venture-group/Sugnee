<?php

namespace App\Services;

use App\Models\CorporationApplicantschedule;
use App\Models\CorporationJoboffer;
use App\Models\Favorite;
use App\Models\User;

class UserService
{
    public function getOmFavorited(User $user)
    {
        $omfavorites = Favorite::where('user_id', $user->id)->get();

        $favoritesOmBaseJobs = CorporationJoboffer::whereIn('id', $omfavorites->pluck('corporation_joboffer_id'))->get();
        $favoritesOmBaseJobs->each(function ($job){
            $job->append('type_of_job');
        });
        return  ['om' => $favoritesOmBaseJobs];
    }
    public function getFrikuFavorited(User $withUser)
    {
        $favoritesFrikuBaseJobs = $withUser->frikuFavorites;
        $favoritesFrikuBaseJobs->each(function ($job){
            $job->append('type_of_job');
        });
        return ['friku' => $favoritesFrikuBaseJobs];
    }
    public function getOmApplied(User $user)
    {
        $applicantWithApplied = CorporationApplicantschedule::with('corporationJoboffer')
            ->where('applicant_id', $user->id)
            ->get();
            $applied['om'] = [];
            if(!empty($applicantWithApplied)){

                $omJoboffer = $applicantWithApplied->map(function ($schedule) {

                    return $schedule->corporationJoboffer;
                });
                $omJoboffer->each(function ($job){
                    $job->append('type_of_job');
                });
                $applied['om'] = $omJoboffer;
            }
        return $applied;
    }

    public function getFrikuApplied(User $withUser)
    {
        $applied['friku'] = [];
        if($withUser->frikuApplicant){
            $frikuApplicant = $withUser->frikuApplicant;
            $frikuJoboffer = collect($frikuApplicant->frikuApplicantSchedules)->map(function ($schedule, $key) {
                return $schedule->frikuJoboffer;
            });
            $frikuJoboffer->each(function ($job){
                $job->append('type_of_job');
            });
            $applied['friku'] = $frikuJoboffer;
        }
        return $applied;


    }
}
