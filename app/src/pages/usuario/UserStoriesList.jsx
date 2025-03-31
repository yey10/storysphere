import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useStory } from "../../context/StoryContext";
import { useAuth } from "../../context/AuthContext";
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'
import Loader from "../../components/Loader";

const UserStoriesList = () => {
  const { userStories, isLoading, fetchUserStories, removeStory } = useStory();
  const { user } = useAuth(); 
  const navigate = useNavigate();


  useEffect(() => {
    if (user?.id) {  
        fetchUserStories(user.id);
    }
}, [user]);

const handleEdit = (story) => {
  
  navigate("/user/createStory", { state: { story } }); 
};

console.log("📖 Historias en userStories:", userStories);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-black relative">
      <ParticlesBackground />
      <div className="relative z-10">
        <DynamicNavbar />
        <main className="container mx-auto px-4">
          <div className="UserStories-page">
            <h1 className="title">Mis Historias</h1>
          
            {userStories.length === 0 ? (
              <div className="NotStories">
                <p>No has creado historias aún.</p>
              </div>
            ) : (
              <div className="Stories-list">
                {userStories.map((story) => (
                  <div key={story.id_story} className="story">
                    <h3 className="text-xl font-semibold">{story.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{story.state}</p>
                    <p className="text-gray-300 truncate">{story.content}</p>
          
                    <div className="mt-3 flex justify-end space-x-2">
                      <button onClick={() => handleEdit(story)} className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black font-bold rounded-md">
                        Editar
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-md"
                        onClick={() => removeStory(story.id_story)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserStoriesList;
