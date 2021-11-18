<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\FrikuCompany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class FrikuJoboffer extends Model
{
    use HasFactory;

    public function frikuFavorited(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'friku_favorites');
    }
    public function frikuCompany()
    {
        return $this->belongsTo(FrikuCompany::class);
    }
}
