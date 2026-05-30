'use client';

import { useState, useEffect } from 'react';
import { Search, Monitor, MessageSquare, Share2, Target, Phone, Mail, X, ChevronLeft, ChevronRight, Settings, Star, Zap, Clock, TrendingUp, CheckCircle, Menu } from 'lucide-react';

type Category = 'websites' | 'chatbots' | 'social' | 'ads';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Category>('websites');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Custom cursor state
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Sarah Jenkins', role: 'CEO, TechFlow', text: 'AURA AI Labs transformed our customer service. Their AI chatbot handles 80% of our inquiries, saving us thousands each month.', rating: 5, img: 'https://i.pravatar.cc/150?img=32' },
    { id: 2, name: 'David Chen', role: 'Founder, StartupX', text: 'The AI-generated website they built for us is not only stunning but incredibly fast. Our conversion rates have doubled!', rating: 5, img: 'https://i.pravatar.cc/150?img=11' },
    { id: 3, name: 'Elena Rostova', role: 'Marketing Director', text: 'Best investment we made this year. The automated social media manager keeps our brand active without any manual effort.', rating: 5, img: 'https://i.pravatar.cc/150?img=5' },
    { id: 4, name: 'Michael Ross', role: 'E-commerce Owner', text: 'Their Ads Running AI optimized my campaigns perfectly. My ROI increased by 300% in just two weeks!', rating: 5, img: 'https://i.pravatar.cc/150?img=68' },
  ]);

  const [newReview, setNewReview] = useState({ name: '', role: '', text: '' });

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    // Custom cursor movement tracking
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button') || target.closest('.glass-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const filteredProjects = projects.filter(p => 
    p.category === activeTab && 
    (p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openModal = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject && selectedProject.images && selectedProject.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject && selectedProject.images && selectedProject.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  const scrollToCategory = (cat: Category) => {
    setActiveTab(cat);
    setMobileMenuOpen(false);
    document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    
    const review = {
      id: Date.now(),
      name: newReview.name,
      role: newReview.role || 'Verified Client',
      text: newReview.text,
      rating: 5,
      img: `https://i.pravatar.cc/150?u=${Date.now()}`
    };
    
    setReviews(prev => [...prev, review]);
    setNewReview({ name: '', role: '', text: '' });
    alert("Review added successfully!");
  };

  return (
    <main style={{ cursor: 'none' }}>
      {/* Custom Cursor */}
      <div 
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{ 
          left: `${cursorPos.x}px`, 
          top: `${cursorPos.y}px`,
          opacity: cursorPos.x === -100 ? 0 : 1
        }}
      >
        <Settings size={24} color="var(--accent-color)" className="cursor-icon" />
      </div>

      <nav className="navbar glass" style={{ zIndex: 1000 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="flex items-center" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/logo.png" alt="AURA AI Labs Logo" style={{ height: '40px', borderRadius: '8px' }} />
            <h2 className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800 }}>AURA AI Labs</h2>
          </div>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div className="category-links" style={{ display: 'flex', gap: '1.5rem', marginRight: '2rem', borderRight: '1px solid rgba(255,255,255,0.2)', paddingRight: '2rem' }}>
              <span onClick={() => scrollToCategory('websites')} style={{ cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: activeTab === 'websites' ? 'var(--accent-color)' : 'var(--text-primary)' }}>Websites</span>
              <span onClick={() => scrollToCategory('chatbots')} style={{ cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: activeTab === 'chatbots' ? 'var(--accent-color)' : 'var(--text-primary)' }}>AI Chatbots</span>
              <span onClick={() => scrollToCategory('social')} style={{ cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: activeTab === 'social' ? 'var(--accent-color)' : 'var(--text-primary)' }}>Social Media</span>
              <span onClick={() => scrollToCategory('ads')} style={{ cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: activeTab === 'ads' ? 'var(--accent-color)' : 'var(--text-primary)' }}>Ads Running</span>
            </div>
            {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-1px' }}>
              <img src="/logo.png" alt="AURA AI Labs" style={{ height: '35px', borderRadius: '50%' }} />
              <span className="gradient-text">AURA AI Labs</span>
            </a>
          </div>    <a href="tel:+94765954950" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)' }}>
                <Phone size={18} /> +94765954950
              </a>
              <a href="mailto:hey.dhananjaya.me@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <Mail size={18} /> Email
              </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav glass" style={{ position: 'fixed', top: '70px', left: 0, width: '100%', padding: '2rem', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <span onClick={() => scrollToCategory('websites')}>Websites</span>
          <span onClick={() => scrollToCategory('chatbots')}>AI Chatbots</span>
          <span onClick={() => scrollToCategory('social')}>Social Media Running</span>
          <span onClick={() => scrollToCategory('ads')}>Ads Running</span>
          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
          <a href="tel:+94765954950" style={{ color: 'var(--accent-color)' }}><Phone size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> +94765954950</a>
          <a href="mailto:hey.dhananjaya.me@gmail.com" style={{ color: 'var(--text-secondary)' }}><Mail size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Email</a>
        </div>
      )}

      {/* Hero Section with Grid Background and Logo Pattern */}
      <div className="hero-bg-grid" style={{
        backgroundImage: `url('/logo.png'), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: '800px, 50px 50px, 50px 50px',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat, repeat, repeat',
        opacity: 0.15,
        mixBlendMode: 'screen',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <section className="section container" style={{ position: 'relative', zIndex: 1, marginTop: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Next Generation <span className="gradient-text">AI Solutions</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Experience the future of digital presence with fully autonomous AI websites, smart chatbots, and automated marketing.
          </p>
        </div>

        {/* Features Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
          <div className="glass-card feature-card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(0, 210, 255, 0.1)', marginBottom: '1rem', color: 'var(--accent-color)' }}>
              <Clock size={32} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>24/7 Automation</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>AI works around the clock. Engage customers and capture leads even while you sleep.</p>
          </div>
          <div className="glass-card feature-card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(122, 40, 203, 0.1)', marginBottom: '1rem', color: 'var(--accent-purple)' }}>
              <TrendingUp size={32} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Cost Reduction</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Reduce human resource costs by automating repetitive tasks, customer support, and marketing.</p>
          </div>
          <div className="glass-card feature-card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(0, 210, 255, 0.1)', marginBottom: '1rem', color: 'var(--accent-color)' }}>
              <Zap size={32} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Instant Setup</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Deploy fully functional AI websites and chatbots in minutes, not months.</p>
          </div>
        </div>

        <div id="projects-section" className="search-container">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search our AI platforms and templates..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'websites' ? 'active' : ''}`}
            onClick={() => setActiveTab('websites')}
          >
            <Monitor size={18} style={{ marginRight: '0.5rem' }} /> Web Sites
          </button>
          <button 
            className={`tab-btn ${activeTab === 'chatbots' ? 'active' : ''}`}
            onClick={() => setActiveTab('chatbots')}
          >
            <MessageSquare size={18} style={{ marginRight: '0.5rem' }} /> AI Chat Bots
          </button>
          <button 
            className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            <Share2 size={18} style={{ marginRight: '0.5rem' }} /> Social Media Manage
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ads' ? 'active' : ''}`}
            onClick={() => setActiveTab('ads')}
          >
            <Target size={18} style={{ marginRight: '0.5rem' }} /> Ads Running
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>Loading AI Models...</div>
        ) : activeTab !== 'websites' ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'rgba(30,20,40,0.5)', borderRadius: '20px', border: '1px dashed var(--accent-purple)' }}>
            <h2 style={{ fontSize: '2.5rem', margin: 0 }} className="gradient-text">Coming Soon!</h2>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <div key={project.id} className="glass-card project-card">
                  <div className="project-image-container" onClick={() => openModal(project)}>
                    <img 
                      src={(project.images && project.images.length > 0) ? project.images[0] : 'https://via.placeholder.com/400x250/222/555?text=No+Image'} 
                      alt={project.title} 
                    />
                    <div className="project-hover-overlay">
                      <span className="btn btn-outline" style={{ background: 'rgba(0,0,0,0.5)' }}>Click to View Gallery</span>
                    </div>
                  </div>
                  <h3 className="project-title" style={{ marginTop: '1rem' }}>{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                      View Live Demo
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                No projects found in this category yet. Stay tuned for updates!
              </div>
            )}
          </div>
        )}
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section container" style={{ marginTop: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2>Simple, Transparent <span className="gradient-text">Pricing</span></h2>
          <p style={{ color: 'var(--text-secondary)' }}>Choose the right AI package for your business needs.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Basic */}
          <div className="glass-card pricing-card" style={{ display: 'flex', flexDirection: 'column', padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Starter</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}><CheckCircle size={18} color="var(--accent-color)" /> Basic AI Website Template</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}><CheckCircle size={18} color="var(--accent-color)" /> Standard Chatbot (FAQ)</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}><CheckCircle size={18} color="var(--accent-color)" /> Email Support</li>
            </ul>
            <a href="https://wa.me/94765954950" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>Contact via WhatsApp</a>
          </div>
          {/* Premium */}
          <div className="glass-card pricing-card popular" style={{ display: 'flex', flexDirection: 'column', padding: '2.5rem', border: '1px solid var(--accent-purple)', background: 'rgba(30,20,40,0.8)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-purple)', padding: '0.2rem 1rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>MOST POPULAR</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent-purple)' }}>Professional</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}><CheckCircle size={18} color="var(--accent-purple)" /> Custom AI Website Design</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}><CheckCircle size={18} color="var(--accent-purple)" /> Advanced Sales Chatbot</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}><CheckCircle size={18} color="var(--accent-purple)" /> Basic Social Media Auto-posting</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}><CheckCircle size={18} color="var(--accent-purple)" /> 24/7 Priority Support</li>
            </ul>
            <a href="https://wa.me/94765954950" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>Contact via WhatsApp</a>
          </div>
          {/* Enterprise */}
          <div className="glass-card pricing-card" style={{ display: 'flex', flexDirection: 'column', padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Enterprise</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}><CheckCircle size={18} color="var(--accent-color)" /> Full Autonomous AI Platform</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}><CheckCircle size={18} color="var(--accent-color)" /> Multi-language AI Agents</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}><CheckCircle size={18} color="var(--accent-color)" /> Automated Ad Campaigns</li>
              <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}><CheckCircle size={18} color="var(--accent-color)" /> Dedicated Account Manager</li>
            </ul>
            <a href="https://wa.me/94765954950" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>Contact via WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Testimonials - Marquee Style */}
      <section id="reviews" style={{ marginTop: '5rem', padding: '4rem 0', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2>What Our <span className="gradient-text">Clients Say</span></h2>
        </div>
        
        <div className="marquee-container">
          <div className="marquee-content">
            {/* Double the reviews for infinite scrolling effect */}
            {[...reviews, ...reviews].map((review, index) => (
              <div key={`${review.id}-${index}`} className="glass-card review-card" style={{ width: '350px', flexShrink: 0 }}>
                <div style={{ display: 'flex', color: '#ffb400', marginBottom: '1rem' }}><Star fill="#ffb400" /><Star fill="#ffb400" /><Star fill="#ffb400" /><Star fill="#ffb400" /><Star fill="#ffb400" /></div>
                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>"{review.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={review.img} alt="Client" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                  <div>
                    <h4 style={{ margin: 0 }}>{review.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--accent-color)' }}>{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Review Form */}
        <div className="container" style={{ marginTop: '4rem', maxWidth: '600px' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Leave a Review</h3>
            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="input-field" 
                value={newReview.name} 
                onChange={e => setNewReview({...newReview, name: e.target.value})} 
                required 
              />
              <input 
                type="text" 
                placeholder="Your Role/Company" 
                className="input-field" 
                value={newReview.role} 
                onChange={e => setNewReview({...newReview, role: e.target.value})} 
              />
              <textarea 
                placeholder="Write your review here..." 
                className="input-field" 
                rows={3} 
                value={newReview.text} 
                onChange={e => setNewReview({...newReview, text: e.target.value})} 
                required 
              ></textarea>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Review</button>
            </form>
          </div>
        </div>
      </section>

      {/* Image Slider Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><X size={24} /></button>
            <h2 style={{ marginBottom: '1rem' }}>{selectedProject.title}</h2>
            
            <div className="slider-container">
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <>
                  <img src={selectedProject.images[currentImageIndex]} alt="Slide" className="slider-image" />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button className="slider-btn prev" onClick={prevImage}><ChevronLeft size={24} /></button>
                      <button className="slider-btn next" onClick={nextImage}><ChevronRight size={24} /></button>
                      <div className="slider-dots">
                        {selectedProject.images.map((_: any, idx: number) => (
                          <span key={idx} className={`dot ${idx === currentImageIndex ? 'active' : ''}`} onClick={() => setCurrentImageIndex(idx)}></span>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No images uploaded for this project.</div>
              )}
            </div>
            
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{selectedProject.description}</p>
            {selectedProject.demoUrl && (
              <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                Visit Live Demo
              </a>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <div className="container">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>&copy; 2026 AURA Labs AI. All rights reserved.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="https://wa.me/94765954950" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)' }}>Contact Us</a>
            <span style={{ color: 'var(--text-secondary)' }}>|</span>
            <a href="mailto:hey.dhananjaya.me@gmail.com" style={{ color: 'var(--accent-color)' }}>hey.dhananjaya.me@gmail.com</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/94765954950" 
        target="_blank" 
        rel="noreferrer"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#25D366',
          color: 'white',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          zIndex: 1000,
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Phone size={30} />
      </a>
    </main>
  );
}
