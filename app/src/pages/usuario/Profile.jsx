import React, { useState, useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'
import '../../assets/css/profile.css'
import { Camera, Edit, Github, Instagram, Linkedin, Mail, MapPin, Twitter } from "lucide-react"

const Profile = () => {
  const {user, userProfile} = useUser();
  const [activeTab, setActiveTab] = useState("about")

  useEffect(() => {
    userProfile();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab)
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
                              <img src={user.profile_picture || "/placeholder.svg?height=200&width=200"} alt="Profile" className="avatar-image" />
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
                        <h1 className="profile-name">{user.name || "Usuario"}</h1>
                        <p className="profile-title">{user.email}</p>

                        <div className="action-buttons">
                          <button className="button outline">
                            <Mail className="icon-small" />
                            Mensaje
                          </button>
                          <button className="button primary">
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
                                  {[
                                    { role: "Senior UX/UI Designer", company: "Estudio Digital", period: "2021 - Presente" },
                                    { role: "Frontend Developer", company: "Tech Solutions", period: "2019 - 2021" },
                                    { role: "UI Designer", company: "Creative Agency", period: "2018 - 2019" },
                                  ].map((job, i) => (
                                    <div key={i} className="experience-item">
                                      <div>
                                        <h3 className="job-title">{job.role}</h3>
                                        <p className="company-name">{job.company}</p>
                                      </div>
                                      <span className="period-badge">{job.period}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {activeTab === "portfolio" && (
                            <div className="portfolio-section">
                              <div className="portfolio-grid">
                                {[1, 2, 3, 4].map((item) => (
                                  <div key={item} className="portfolio-item">
                                    <img
                                      src={`/placeholder.svg?height=300&width=400&text=Proyecto ${item}`}
                                      alt={`Proyecto ${item}`}
                                    />
                                    <div className="portfolio-overlay">
                                      <div className="portfolio-info">
                                        <h3 className="portfolio-title">Proyecto {item}</h3>
                                        <p className="portfolio-category">Diseño UX/UI</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Footer />
                </main>
            </div>
        </div>
    </div>
  )
}

export default Profile
