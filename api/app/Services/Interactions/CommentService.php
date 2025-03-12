<?php
namespace App\Services\Interactions;

use App\Models\Comment;
use Illuminate\Support\Facades\Auth;


class CommentService
{
    public function getAllCommentsForStory($storyId)
    {
        return Comment::with('user')->where('id_story', $storyId)->get();
    }

    public function createComment(array $data, $storyId)
    {
        $data['id_user'] = Auth::id();
        $data['id_story'] = $storyId;

        return Comment::create($data)->load('user');
    }

    public function getCommentById($comment)
    {
        return Comment::with('user', 'story')->findOrFail($comment);
    }

    public function updateComment(array $data, $commentId)
    {
        $comment = Comment::findOrFail($commentId);
        $comment->update($data);
        return $comment;
    }

    public function deleteComment($comment)
    {
        $comment = Comment::findOrFail($comment);
        $comment->delete();
        return $comment;
    }

    public function getCommentsByUser($userId)
    {
        return Comment::where('id_user', $userId)->get();
    }

    public function getCommentOwner($id)
    {
        return Comment::with('user')->findOrFail($id);
    }
}