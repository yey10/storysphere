import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground";
import NavbarUsuario from '../../components/NavbarUsuario';
import Footer from "../../components/Footer";
import '../../assets/css/storypage.css';
import { useStory } from "../../context/StoryContext";
import { useAuth } from "../../context/AuthContext";
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
  const  { user } = useAuth();
  const { getStory } = useStory();
  const { likes, favorites, handleToggleInteraction, fetchInteractions, userInteractions } = useLikes();
  const { ratings, userRatings, handleRateStory, fetchRating, handleRemoveRating } = useRatings();
  const { comments, addComment, removeComment, getAllComments } = useComment();
  const [newComment, setNewComment] = useState("");
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //obtener informacion del usuario
  const currentUserId = user ? user.id : null;
  const isAdmin = user ? user.role === 'admin' : false;

  useEffect(() => {
    let isMounted = true;
    const fetchStory = async () => {
      try {
        const story = await getStory(id);
        if (isMounted) setStory(story);
      } catch (error) {
        console.error("Error al obtener la historia:", error);
        if (isMounted) setError(error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchStory();
    return () => {isMounted = false};
  }, [id, getStory]);

  useEffect(() => {
    fetchInteractions(id);
  }, [id, fetchInteractions]);

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
    handleToggleInteraction(id, "like");
    console.log(`Like clickeado en historia ${id}, estado actual:`, userInteractions[id]);
  };

  const handleFavorite = () => {
    handleToggleInteraction(id, "favorite");
    console.log(`Favorito clickeado en historia ${id}, estado actual:`, userInteractions[id]);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
  
    try {
      await addComment(id, { content_comment: newComment });
      setNewComment("");
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
      setError("Error al agregar el comentario. Inténtalo de nuevo.");
    }
  };


  const handleRemoveComment = async (commentId) => {
    try {
      await removeComment(commentId, id);
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
      setError("Error al eliminar el comentario. Inténtalo de nuevo.");
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
                  likes={likes[id] || 0}
                  favorites={favorites[id] || 0}
                  handleLike={handleLike}
                  handleFavorite={handleFavorite}
                  userInteraction={userInteractions[id] || null}
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
                currentUserId={currentUserId}
                isAdmin={isAdmin}
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