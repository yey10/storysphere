import { useState, useEffect } from 'react'
import { Heart, Bookmark } from 'lucide-react';
import {useLikes} from '../context/LikeContext';
import {useStory} from '../context/StoryContext';

const FavoriteData = () => {
    const [vista, setVista] = useState("meGusta");
    const [historias, setHistorias] = useState([]);
    const {userInteractions} = useLikes();
    const { stories, isLoading, fetchStories } = useStory();

    useEffect(() => {
      fetchStories();
  }, [fetchStories]);

  useEffect(() => {
    if (!stories || isLoading) return;

    const historiasFiltradas = stories.filter(story => {
        const interaction = userInteractions[story.id_story];
        if (vista === "meGusta") return interaction === "like" || interaction === "both";
        if (vista === "favoritos") return interaction === "favorite" || interaction === "both";
        return false;
    });

    setHistorias(historiasFiltradas);
  }, [stories, userInteractions, vista, isLoading]);



  return (
    <div className="contenedor">
            <div className="botones">
                <button
                    className={vista === "meGusta" ? "boton activo" : "boton"}
                    onClick={() => setVista("meGusta")}
                >
                    <Heart /> <p>Me Gusta</p>
                </button>
                <button
                    className={vista === "favoritos" ? "boton activo" : "boton"}
                    onClick={() => setVista("favoritos")}
                >
                    <Bookmark /> <p>Favoritos</p>
                </button>
            </div>

            <div className="lista">
                {historias.map(historia => (
                    <div key={historia.id_story} className="item">
                        <div className="like-image">
                            <div>{vista === "meGusta" ? <Heart fill="red" /> : <Bookmark fill="yellow" />}</div>
                            <img src={historia.photo} alt={historia.title} />
                        </div>
                        <div className="like-info">
                            <h2 className="title">{historia.title}</h2>
                            <p>{historia.author}</p>
                            <div><p>{historia.description}</p></div>
                            <button className="buttonLight">Leer Historia</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default FavoriteData
