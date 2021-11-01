<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Staff;
class FrikuCompany extends Model
{
    use HasFactory;
    protected $connection = 'fukuriku';
    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }
}
