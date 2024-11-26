<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Story;

class Comment extends Model
{
    use HasFactory;


    public $timestamps = false;
    protected $table = 'comments';
    protected $primaryKey = 'id_comment';
    protected $fillable = [
        'content_comment',
        'id_user',
        'id_story',
    ];

    //Relación con el usuario

    public function user(){
        return $this ->belongsTo(User::class, 'id_user', 'id_user');
    }

    //Relación con la historia
    public function  story(){
        return $this ->belongsTo(Story::class, 'id_story', 'id_story');
    }




}
