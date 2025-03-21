import { useEffect } from "react";
import { useStory } from "../context/StoryContext";
import { useAuth } from "../context/AuthContext"; // Asegúrate de tener el contexto de autenticación

const UserStoriesList = () => {
  const { userStories, isLoading, fetchUserStories, removeStory } = useStory();
  const { user } = useAuth(); // Obtener el usuario autenticado

  useEffect(() => {
    if (user?.id_user) {  
        fetchUserStories(user.id_user);
    }
}, [user, fetchUserStories]);
  if (isLoading) {
    return <p className="text-center text-gold-500">Cargando historias...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black text-gold-500 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center border-b border-gold-500 pb-2 mb-4">
        Mis Historias
      </h2>

      {userStories.length === 0 ? (
        <p className="text-center text-gray-400">No has creado historias aún.</p>
      ) : (
        <div className="space-y-4">
          {userStories.map((story) => (
            <div
              key={story.id_story}
              className="bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{story.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{story.state}</p>
              <p className="text-gray-300 truncate">{story.content}</p>

              <div className="mt-3 flex justify-end space-x-2">
                <button className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black font-bold rounded-md">
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
  );
};

export default UserStoriesList;
