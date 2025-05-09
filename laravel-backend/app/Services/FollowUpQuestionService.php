
<?php

namespace App\Services;

use App\Models\FollowUpQuestion;
use Illuminate\Support\Facades\Auth;

class FollowUpQuestionService
{
    public function getAllFollowUpQuestions()
    {
        return FollowUpQuestion::where('tenant_id', Auth::user()->tenant_id)
            ->with('children')
            ->whereNull('parent_id')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getFollowUpQuestionById($id)
    {
        return FollowUpQuestion::where('tenant_id', Auth::user()->tenant_id)
            ->with('children')
            ->findOrFail($id);
    }

    public function createFollowUpQuestion(array $data)
    {
        $data['tenant_id'] = Auth::user()->tenant_id;
        return FollowUpQuestion::create($data);
    }

    public function updateFollowUpQuestion($id, array $data)
    {
        $question = $this->getFollowUpQuestionById($id);
        $question->update($data);
        return $question;
    }

    public function deleteFollowUpQuestion($id)
    {
        $question = $this->getFollowUpQuestionById($id);
        
        // Also delete all child questions
        FollowUpQuestion::where('parent_id', $id)->delete();
        
        return $question->delete();
    }
}
