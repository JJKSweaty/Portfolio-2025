import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faMicrochip, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

const StyledGlitchButton = styled.a`
  button {
    padding: 10px 50px;
    font-size: 20px;
    border: 1px solid var(--theme-primary);
    border-radius: 5px;
    color: var(--theme-primary);
    background-color: transparent;
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
  }

  button:hover {
    background-color: var(--theme-bg-card);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px var(--theme-glow);
  }
`;

const getYouTubeId = (url) => {
  if (!url) return null;
  // Handle common YouTube formats: watch?v=, youtu.be/, embed/
  const regex = /(?:youtube(?:-nocookie)?\.com\/(?:.*v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  if (match && match[1]) return match[1];
  // Fallback: try to find v= or last path segment (not precise but helps)
  const vMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (vMatch && vMatch[1]) return vMatch[1];
  const lastPath = url.split('/').pop();
  if (lastPath && lastPath.length === 11) return lastPath;
  return null;
};

const getVideoThumbnail = (project) => {
  // prefer an explicitly provided demoThumbnail in project data
  if (project.demoThumbnail) return project.demoThumbnail;
  if (project.demoVideo) {
    const id = getYouTubeId(project.demoVideo);
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  // fall back to project.image if available
  if (project.image) return project.image;
  return null;
};

const FeaturedDemoCard = ({ project, onWatchDemo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mb-12"
    >
      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-[var(--theme-primary)]/20 shadow-2xl hover:shadow-[var(--theme-primary)]/20 transition-all duration-500">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-primary)]/5 via-transparent to-[var(--theme-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glow effects */}
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[var(--theme-primary)]/30 to-transparent blur-3xl transition-all duration-700 group-hover:scale-150" />
        <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-gradient-to-br from-[var(--theme-secondary)]/30 to-transparent blur-3xl transition-all duration-700 group-hover:scale-150" />
        
        <div className="relative p-8 md:p-10">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Video Demo Button Section */}
            <div
              onClick={onWatchDemo}
              className="relative flex-shrink-0 w-full lg:w-72 h-44 rounded-2xl border border-[var(--theme-primary)]/30 cursor-pointer overflow-hidden group/video bg-slate-900"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') onWatchDemo();
              }}
            >
              {/* Use actual thumbnail image if available */}
              {(() => {
                const thumbnail = getVideoThumbnail(project);
                if (thumbnail) {
                  return (
                    <img
                      src={thumbnail}
                      alt={`${project.name} demo thumbnail`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  );
                }
                return null;
              })()}
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Pulsing ring animation */}
                  <div className="absolute inset-0 rounded-full bg-[var(--theme-primary)]/20 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] shadow-[0_8px_30px_var(--theme-glow)] group-hover/video:scale-110 transition-transform duration-300">
                    <FontAwesomeIcon 
                      icon={faPlay} 
                      className="text-2xl text-white ml-1"
                    />
                  </div>
                </div>
              </div>
              
              {/* Grid pattern background visible when there is no thumbnail */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: `linear-gradient(var(--theme-primary) 1px, transparent 1px),
                                    linear-gradient(90deg, var(--theme-primary) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }} />
              </div>
              
              {/* Watch Demo label */}
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <span className="text-sm font-medium text-[var(--theme-primary)] tracking-wide uppercase">
                  Watch Demo
                </span>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] text-xs font-semibold uppercase tracking-wider">
                  Featured Project
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)]">
                  <FontAwesomeIcon 
                    icon={faMicrochip} 
                    className="text-lg text-white"
                  />
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{project.name}</h3>
              
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-5">
                {project.description}
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-5">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag.name}
                    className="inline-flex items-center gap-1 rounded-lg bg-[var(--theme-primary)]/10 px-3 py-1 text-xs text-[var(--theme-primary)] border border-[var(--theme-primary)]/20"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
              
              {project.source_code_link && (
                <a
                  href={project.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)] transition-all duration-300"
                >
                  <img src={github} alt="github" className="w-4 h-4" />
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ index, name, description, tags, image, source_code_link, type }) => {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="group relative min-h-[360px] w-full max-w-[320px]">
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--theme-primary)]/20 h-full">
          <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-[var(--theme-primary)]/20 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
          <div className="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-gradient-to-br from-[var(--theme-secondary)]/20 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
          
          <div className="relative p-4 flex flex-col h-full">
            <div className="flex flex-col items-center text-center">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] mb-2">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                <FontAwesomeIcon 
                  icon={type === 'hardware' ? faMicrochip : faCode} 
                  className="text-xl text-white"
                />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">{name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Project</span>
                {source_code_link && (
                  <a
                    href={source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/save flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 transition-colors hover:bg-slate-800"
                  >
                    <img
                      src={github}
                      alt="source code"
                      className="h-4 w-4 text-slate-400 transition-colors group-hover/save:text-[var(--theme-primary)]"
                    />
                  </a>
                )}
              </div>
            </div>

            <div className="mt-2 flex flex-wrap justify-center gap-1.5 min-h-[50px]">
              {tags.map((tag) => (
                <span
                  key={tag.name}
                  className={`inline-flex items-center gap-1 rounded-lg bg-[var(--theme-primary)]/10 px-2 py-0.5 text-xs text-[var(--theme-primary)]`}
                >
                  #{tag.name}
                </span>
              ))}
            </div>

            <div className="mt-2 flex-grow">
              <p className="text-xs leading-relaxed text-slate-400 text-center mb-0">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  const [activeTab, setActiveTab] = useState('hardware');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');

  const softwareProjects = projects.filter(project => project.type === 'software');
  const hardwareProjects = projects.filter(project => project.type === 'hardware');
  
  // Get featured project (ESP32 Media Controller) and non-featured hardware projects
  const featuredProject = hardwareProjects.find(p => p.featured);
  const nonFeaturedHardwareProjects = hardwareProjects.filter(p => !p.featured);

  const handleWatchDemo = (videoUrl) => {
    setActiveVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className="text-4xl font-bold text-[var(--theme-primary)] text-center mb-8">Projects</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-3 text-white text-[17px] max-w-[1100px] leading-[30px]'
        >
         I've tackled a range of software and hardware challenges across full-stack, embedded systems and some hardware design. I built an ESP32 Media Controller with Flask for music playback and Discord voice controls, developed SignToLearn (React, Flask, OpenCV, MediaPipe) achieving 90% real-time ASL recognition, and created a Claude-powered firmware assistant with RAG and Supabase integration reducing token usage by 60%. On the machine learning side, I implemented a custom CUDA MLP for MNIST classification achieving 2× speedup over PyTorch. For hardware projects, I engineered an STM32-based motor tester using SPI and PWM, and designed a heartbeat monitor PCB in KiCad with the MAX30102 sensor.
        </motion.p>
      </div>

      <div className="mt-12 flex justify-center gap-4">
        <button
          onClick={() => setActiveTab('hardware')}
          className={`px-6 py-2 rounded-md transition-all duration-300 ${
            activeTab === 'hardware'
              ? 'bg-[var(--theme-primary)] text-black'
              : 'text-white hover:bg-[var(--theme-primary)]/10'
          }`}
        >
          Hardware
        </button>
        <button
          onClick={() => setActiveTab('software')}
          className={`px-6 py-2 rounded-md transition-all duration-300 ${
            activeTab === 'software'
              ? 'bg-[var(--theme-primary)] text-black'
              : 'text-white hover:bg-[var(--theme-primary)]/10'
          }`}
        >
          Software
        </button>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Featured Demo Card for Hardware Tab */}
            {activeTab === 'hardware' && featuredProject && (
              <FeaturedDemoCard 
                project={featuredProject} 
                onWatchDemo={() => handleWatchDemo(featuredProject.demoVideo)}
              />
            )}
            
            {activeTab === 'software' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4">
                {softwareProjects.map((project, index) => (
                  <ProjectCard key={index} index={index} {...project} type={activeTab} />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-8 w-full max-w-4xl mx-auto px-4">
                {nonFeaturedHardwareProjects.map((project, index) => (
                  <div key={index} className="w-full sm:w-1/2 max-w-[360px]">
                    <ProjectCard index={index} {...project} type={activeTab} />
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'hardware' && (
              <div className="flex justify-center mt-8">
                <a
                  href="/hardware-portfolio.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-[var(--theme-primary)] text-[var(--theme-primary)] rounded-md \
                         hover:bg-[var(--theme-primary)] hover:text-black transition-all duration-300\n                         shadow-[0_0_15px_var(--theme-glow)] hover:shadow-[0_0_25px_var(--theme-glow)]"
                >
                  View Hardware Portfolio
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-[var(--theme-primary)]/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)]">
                    <FontAwesomeIcon icon={faMicrochip} className="text-sm text-white" />
                  </div>
                  <span className="text-white font-semibold">ESP32 Media Controller Demo</span>
                </div>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Video Container */}
              <div className="relative aspect-video bg-black">
                {(() => {
                  const videoId = getYouTubeId(activeVideoUrl);
                  const embedUrl = videoId 
                    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` 
                    : activeVideoUrl;
                  return (
                    <iframe
                      src={embedUrl}
                      title="ESP32 Media Controller Demo"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionWrapper(Works, 'projects');