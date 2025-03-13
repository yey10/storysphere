import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground";
import NavbarUsuario from '../../components/NavbarUsuario';
import Footer from "../../components/Footer";
import '../../assets/css/storypage.css';
import { useStory } from "../../context/StoryContext";
import { useLikes } from "../../context/LikeContext";
import { useRatings } from "../../context/RatingsContext";
import { useComment } from "../../context/CommentContext";
import StoryHeader from "../../components/Story/StoryHeader";
import StoryContent from "../../components/Story/StoryContent";
import StoryChapters from "../../components/Story/StoryChapters";
import StoryRating from "../../components/Story/StoryRating";
import StoryComments from "../../components/Story/StoryComments";

const StoryPage = () => {
  const { id } = useParams();
  const { getStory } = useStory();
  const { likes, handleToggleLike, fetchLikes } = useLikes();
  const { ratings, userRatings, handleRateStory, fetchRating, handleRemoveRating } = useRatings();
  const { comments, addComment, removeComment, getAllComments } = useComment();
  const [newComment, setNewComment] = useState("");
  const [isLiking, setIsLiking] = useState(false);
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const story = await getStory(id);
        setStory(story);
      } catch (error) {
        console.error("Error al obtener la historia:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStory();
  }, [id, getStory]);

  useEffect(() => {
    fetchLikes(id);
  }, [id, fetchLikes]);

  useEffect(() => {
    fetchRating(id);
  }, [id, fetchRating]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        await getAllComments(id);
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };
    fetchComments();
  }, [id, getAllComments]);

  const handleLike = () => {
    handleToggleLike(id);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
  
    try {
      await addComment(id, { content_comment: newComment });
      setNewComment("");
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
    }
  };

  const handleRemoveComment = async (commentId) => {
    try {
      await removeComment(commentId, id);
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
          <NavbarUsuario />
          <main className="container mx-auto px-4">
            <h2 className="text-white text-center py-10">Cargando historia...</h2>
            <Footer />
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
          <NavbarUsuario />
          <main className="container mx-auto px-4">
            <h2 className="text-white text-center py-10">Error al cargar la historia</h2>
            <Footer />
          </main>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
          <NavbarUsuario />
          <main className="container mx-auto px-4">
            <h2 className="text-white text-center py-10">Historia no encontrada</h2>
            <Footer />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
          <NavbarUsuario />
          <main className="container mx-auto px-4">
            <div className="storypage">
              <div className="read">
                <StoryHeader
                  story={story}
                  likes={likes}
                  handleLike={handleLike}
                  isLiking={isLiking}
                  userRatings={userRatings}
                  ratings={ratings}
                  id={id}
                  handleRateStory={handleRateStory}
                  
                />
                <StoryContent story={story} />
              </div>
              <StoryChapters />
              <StoryRating
                userRatings={userRatings}
                ratings={ratings}
                id={id}
                handleRateStory={handleRateStory}
                
              />
              <StoryComments
                storyComments={comments}
                newComment={newComment}
                setNewComment={setNewComment}
                handleAddComment={handleAddComment}
                handleRemoveComment={handleRemoveComment}
              />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;