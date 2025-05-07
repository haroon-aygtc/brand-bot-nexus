
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('branding_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->string('assistant_name')->default('AI Assistant');
            $table->string('primary_color', 50)->default('#6366f1');
            $table->string('secondary_color', 50)->default('#8b5cf6');
            $table->boolean('enable_branding')->default(true);
            $table->string('logo_url')->nullable();
            $table->boolean('use_animated_avatar')->default(false);
            $table->text('custom_css')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branding_settings');
    }
};
