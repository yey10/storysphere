<?php

use Illuminate\Database\Migrations\Migration;
use illuminate\Support\Facades\DB;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('roles')->insert([
            ['name_rol' => 'User'],
            ['name_rol' => 'Admin']
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('roles')->whereIn('name_rol', ['Admin', 'User'])->delete();
    }
};
