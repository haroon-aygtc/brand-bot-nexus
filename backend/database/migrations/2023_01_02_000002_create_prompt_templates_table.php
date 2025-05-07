
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
        Schema::create('prompt_templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('content');
            $table->string('category', 50); // general, support, technical, etc
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
        
        // Pivot table for AI models and prompt templates
        Schema::create('ai_model_prompt_template', function (Blueprint $table) {
            $table->foreignId('ai_model_id')->constrained()->onDelete('cascade');
            $table->foreignId('prompt_template_id')->constrained()->onDelete('cascade');
            $table->primary(['ai_model_id', 'prompt_template_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_model_prompt_template');
        Schema::dropIfExists('prompt_templates');
    }
};
