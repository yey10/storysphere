import { useState, useEffect } from 'react'
import { Heart, Bookmark } from 'lucide-react';
import {useLikes} from '../context/LikeContext';
import {useStory} from '../context/StoryContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Placeholder from '../assets/img/logo.jpeg';

const FavoriteData = () => {
    const [vista, setVista] = useState("meGusta");
    const [historias, setHistorias] = useState([]);
    const {userInteractions} = useLikes();
    const { stories, isLoading, fetchStories } = useStory();

    useEffect(() => {
        if (stories.length === 0) fetchStories();
    }, [fetchStories, stories]);

  useEffect(() => {
    console.log("userInteractions:", userInteractions); // 🔍 Ver datos
    console.log("stories:", stories); // 🔍 Ver historias
    if (!stories || isLoading || Object.keys(userInteractions).length === 0) return;

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
                {historias.length > 0 ? (
                    historias.map(historia => (
                        <div key={historia.id_story} className="item">
                            <div className="like-image">
                                {vista === "meGusta" ? (
                                    <div><Heart fill="red" /></div>
                                ) : (
                                    <div><Bookmark fill="yellow" /></div>
                                )}
                                <LazyLoadImage src={historia.photo} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                            </div>
                            <div className="like-info">
                                <h2 className="title">{historia.title}</h2>
                                <p>{historia.author}</p>
                                <div><p>{historia.description}</p></div>
                                <button className="buttonLight">Leer Historia</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="mensaje">No hay historias en esta categoría.</p>
                )}
            </div>
        </div>
  )
}

export default FavoriteData
