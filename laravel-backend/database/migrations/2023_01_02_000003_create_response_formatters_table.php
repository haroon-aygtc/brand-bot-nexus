
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
        Schema::create('response_formatters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('type'); // markdown, html, custom
            $table->text('format_template');
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
        
        // Pivot table for AI models and response formatters
        Schema::create('ai_model_response_formatter', function (Blueprint $table) {
            $table->foreignId('ai_model_id')->constrained()->onDelete('cascade');
            $table->foreignId('response_formatter_id')->constrained()->onDelete('cascade');
            $table->primary(['ai_model_id', 'response_formatter_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_model_response_formatter');
        Schema::dropIfExists('response_formatters');
    }
};
