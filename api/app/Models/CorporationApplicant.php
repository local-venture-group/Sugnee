<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 use App\Models\CorporationApplicantschedule;
 use App\Models\User;
class CorporationApplicant extends Model
{
    use HasFactory;

    protected $connection = 'ats';
    protected $table = 'corporation_applicant';
    public $timestamps = false;
    public function corporationApplicantSchedules()
    {
        return $this->hasMany(CorporationApplicantschedule::class);
    }
    public function user()
    {
        return $this->hasOne(User::class);
    }
}
