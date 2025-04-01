import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useStory } from "../../context/StoryContext";
import { useAuth } from "../../context/AuthContext";
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'
import Loader from "../../components/Loader";
import '../../assets/css/user-story.css'

const UserStoriesList = () => {
  const { userStories, isLoading, fetchUserStories, removeStory } = useStory();
  const { user } = useAuth(); 
  const navigate = useNavigate();


  useEffect(() => {
    if (user?.id && userStories.length === 0) {  
        fetchUserStories(user.id);
    }
}, [user, fetchUserStories]);

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
                    <div>
                      <img src={story.photo} alt={story.title} />
                    </div>
                    <div className="story-info">
                      <h3 className="title">{story.title}</h3>
                      <p>{story.state}</p>
                      <div><p>{story.content}</p></div>
                      
                      <div className="botones">
                        <button onClick={() => handleEdit(story)} className="btn-editar">
                          Editar
                        </button>
                        <button
                          className="btn-eliminar"
                          onClick={() => removeStory(story.id_story)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default UserStoriesList;
