import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import ParticlesBackground from '../../components/ParticlesBackground';
import NavbarUsuario from '../../components/NavbarUsuario';
import Footer from '../../components/Footer';
import SliderUsuario2 from '../../components/Sliders/SliderUsuario2';
import SliderUsuario3 from '../../components/Sliders/SliderUsuario3';
import '../../assets/css/storiesusuario.css';
import SliderStorie from '../../components/Sliders/SliderStorie';
import SliderStories from '../../components/Sliders/SliderStories';
import { Misterio, Terror, Accion, Ficcion } from '../../data/histories';
import StoriesData from '../../components/StoriesData';
import { stories } from '../../data/stories';
import {useStory} from '../../context/StoryContext';
import { Search } from 'lucide-react';

const Stories = () => {

    const { stories, fetchStories, isLoading } = useStory();
    useEffect(() => {
        if (stories.length === 0 && !isLoading) {
            fetchStories();
        }
    }, [stories, isLoading]);
    

  return (
    <div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
            <NavbarUsuario />
            <main className="container mx-auto px-4">
                <div className='storiespage'>

                    <div className="body-1 bg">
                        <div className='boxslider'>
                            <h3 className='title'>Historias que te pueden interesar</h3>
                            <SliderUsuario2 />
                        </div>
                        <div className='boxslider'>
                            <h3 className='title'>Ultimas historias para ti</h3>
                            <SliderUsuario3 />
                        </div>
                    </div>

                    <div className="body-2">
                        <div className='boxslider'>
                            <h3 className='title'>LO MÁS DESTACADO</h3>
                            <SliderStorie />
                        </div>
                    </div>

                    <div className="body-3 bg">
                        <h4 className='title'>Misterio</h4>
                        <SliderStories movies={Misterio} />
                        <h4 className='title'>Terror</h4>
                        <SliderStories movies={Terror} />
                        <h4 className='title'>Acción</h4>
                        <SliderStories movies={Accion} />
                        <h4 className='title'>Ficción</h4>
                        <SliderStories movies={Ficcion} />
                        <div className='button1'>
                            <button className='buttonLight'><Link to="/categories">Ver más</Link></button>
                        </div>
                    </div>

                    <div className="body-4 bg">
                        <div className='search'>
                            <form>
                                <input type="text" placeholder='Buscar una historia' />
                                <button type='submit'><Search /></button>
                            </form>
                        </div>
                            {isLoading ? (
                            <p>Cargando historias...</p>
                            ) : (
                            <StoriesData stories={stories} />
                            )}
                    </div>

                    

                </div>

                <Footer />
            </main>
        </div>
      </div>
    </div>
  )
}

export default Stories
