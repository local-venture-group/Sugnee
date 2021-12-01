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
        return  ['om' => $favoritesOmBaseJobs];
    }
    public function getFrikuFavorited(User $withUser)
    {
        $favoritesFrikuBaseJobs = $withUser->frikuFavorites;
        return ['friku' => $favoritesFrikuBaseJobs];
    }
    public function getOmApplied(User $user)
    {
        $applicantWithApplied = CorporationApplicantschedule::with('corporationJoboffer')
            ->where('applicant_id', $user->id)
            ->get();
            $applied = [];
            if(!empty($applicantWithApplied)){
                $applied['om'] = $applicantWithApplied->map(function ($schedule) {

                    return $schedule->corporationJoboffer;
                });
            }
        return $applied;
    }

    public function getFrikuApplied(User $withUser)
    {
        $applied['friku'] = [];
        // if(empty($withUser->frikuApplicant)){
        //     return $applied;

        //     if(empty($withUser->frikuApplicant->frikuApplicantSchedules)){
        //         return $applied;
        //     }
        // }

        // $applied['friku'] = collect($withUser->frikuApplicant->frikuApplicantSchedules)->map(function ($schedule, $key) {
        //     return $schedule->frikuJoboffer;
        // });
        // return $applied;
        if($withUser->frikuApplicant){
            $frikuApplicant = $withUser->frikuApplicant;
            $applied['friku'] = collect($frikuApplicant->frikuApplicantSchedules)->map(function ($schedule, $key) {
                return $schedule->frikuJoboffer;
            });
        }
        return $applied;


    }
}
