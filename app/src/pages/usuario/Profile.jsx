import React, { useState, useEffect } from 'react'
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'
import EditProfileModal from '../../components/EditProfileModal'
import '../../assets/css/profile.css'
import { useStory } from '../../context/StoryContext';
import { useUser } from '../../context/UserContext';
import { Camera, Edit, Github, Instagram, Linkedin, Mail, MapPin, Twitter } from "lucide-react"

const Profile = () => {
  
  const { user, updateUser, isLoading } = useUser();
  const { fetchUserStories, userStories } = useStory();
  //const [userStories, setUserStories] = useState([]);
  const [activeTab, setActiveTab] = useState("about")
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user?.id_user) {
        fetchUserStories(user.id_user);
    }
}, [user, fetchUserStories]);

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  if (isLoading) {
    return <p className="text-white text-center">Cargando perfil...</p>;
  }

  if (!user) {
    return <p className="text-white text-center">Cargando perfil...</p>;
  }

  return (
    <div>
        <div className="min-h-screen bg-black relative">
            <ParticlesBackground />
            <div className="relative z-10">
                <DynamicNavbar />
                <main className="container mx-auto px-4">
                  <div className="profile-container">
                    {/* Decorative elements */}
                    <div className="decorative-blob top"></div>
                    <div className="decorative-blob bottom"></div>

                    <div className="profile-wrapper">
                      {/* Profile picture with unique border */}
                      <div className="avatar-container">
                        <div className="avatar-wrapper">
                          <div className="avatar-gradient">
                            <div className="avatar-image-container">
                              <img src={user.profile_photo || ""} alt="Profile" className="avatar-image" />
                            </div>
                          </div>
                          <button className="camera-button">
                            <Camera className="icon-small" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Profile content */}
                    <div className="profile-card">
                      <div className="profile-header">
                        <h1 className="profile-name">{user.name}</h1>
                        <p className="profile-title">{user.email}</p>
                        <p className="profile-role text-sm text-gray-400">{user.role}</p>
                        <p className={`profile-status ${user.account_status === "active" ? "text-green-500" : "text-red-500"}`}>
                          {user.account_status === "active" ? "Cuenta Activa" : "Cuenta Inactiva"}
                        </p>

                        <div className="action-buttons">
                          <button className="button outline">
                            <Mail className="icon-small" />
                            Mensaje
                          </button>
                          <button className="button primary" onClick={() => setIsModalOpen(true)}>
                            <Edit className="icon-small" />
                            Editar Perfil
                          </button>
                        </div>

                        <div className="social-links">
                          <button className="social-button">
                            <Twitter className="icon" />
                          </button>
                          <button className="social-button">
                            <Instagram className="icon" />
                          </button>
                          <button className="social-button">
                            <Linkedin className="icon" />
                          </button>
                          <button className="social-button">
                            <Github className="icon" />
                          </button>
                        </div>
                      </div>

                      <div className="tabs-container">
                        <div className="tabs-list">
                          <button
                            className={`tab-button ${activeTab === "about" ? "active" : ""}`}
                            onClick={() => handleTabChange("about")}
                          >
                            Sobre mí
                          </button>
                          <button
                            className={`tab-button ${activeTab === "portfolio" ? "active" : ""}`}
                            onClick={() => handleTabChange("portfolio")}
                          >
                            Portfolio
                          </button>
                        </div>

                        <div className="tab-content">
                          {activeTab === "about" && (
                            <div className="about-section">
                              <div className="section">
                                <h2 className="section-title">Biografía</h2>
                                <p className="section-text">
                                  {user.biography || "Sin biografía disponible."}
                                </p>
                              </div>

                              <div className="section">
                                <h2 className="section-title">Historias Destacadas</h2>
                                <div className="experience-list">
                                  {userStories.length > 0 ? (
                                    userStories.map((story) => (
                                      <div key={story.id_story} className="experience-item">
                                        <h3 className="job-title">{story.title}</h3>
                                        <p className="company-name">{story.category}</p>
                                        <span className="period-badge">{story.created_at}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-white">No hay historias disponibles.</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {activeTab === "portfolio" && (
                            <div className="portfolio-section">
                              <div className="portfolio-grid">
                                {userStories.length > 0 ? (
                                  userStories.map((story) => (
                                    <div key={story.id_story} className="portfolio-item">
                                      <img
                                        src={story.image || "/placeholder.svg?height=300&width=400&text=Historia"}
                                        alt={story.title}
                                      />
                                      <div className="portfolio-overlay">
                                        <div className="portfolio-info">
                                          <h3 className="portfolio-title">{story.title}</h3>
                                          <p className="portfolio-category">{story.category}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-white">No hay historias disponibles.</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <EditProfileModal
                    visible={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={updateUser}
                    user={user}
                  />
                  <Footer />
                </main>
            </div>
        </div>
    </div>
  )
}

export default Profile
