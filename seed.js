const fs = require('fs/promises');
const path = require('path');

async function seed() {
  const dbPath = path.join(__dirname, 'data', 'db.json');
  const demosDir = path.join(__dirname, 'public', 'demos');
  
  try {
    const files = await fs.readdir(demosDir);
    const htmlFiles = files.filter(f => f.endsWith('.html'));

    const generateRandomImage = (seed) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/400/250`;

    const projects = [];

    // Add Websites from the html files
    for (const file of htmlFiles) {
      const title = file.replace('.html', '').replace(/-/g, ' ');
      projects.push({
        id: Date.now() + Math.random(),
        title: title.charAt(0).toUpperCase() + title.slice(1),
        description: `A premium AI-generated website template for ${title}. Fully responsive and dynamic.`,
        category: 'websites',
        images: [generateRandomImage(title)],
        demoUrl: `/demos/${encodeURIComponent(file)}`,
        createdAt: new Date().toISOString()
      });
    }

    // Add some AI Chatbots
    const chatbots = [
      { title: 'Customer Support Bot', desc: 'AI-powered customer service agent that answers FAQs and routes complex issues to human agents.' },
      { title: 'Sales Assistant AI', desc: 'Proactive chatbot that engages visitors, qualifies leads, and books meetings automatically.' },
      { title: 'E-commerce Concierge', desc: 'Helps customers find products, tracks orders, and handles returns via natural language.' }
    ];

    chatbots.forEach(bot => {
      projects.push({
        id: Date.now() + Math.random(),
        title: bot.title,
        description: bot.desc,
        category: 'chatbots',
        images: [generateRandomImage(bot.title)],
        demoUrl: '#',
        createdAt: new Date().toISOString()
      });
    });

    // Add Social Media tools
    projects.push({
      id: Date.now() + Math.random(),
      title: 'Auto-Post AI Manager',
      description: 'AI tool that generates and schedules social media posts automatically based on trending topics.',
      category: 'social',
      images: [generateRandomImage('SocialMedia')],
      demoUrl: '#',
      createdAt: new Date().toISOString()
    });

    // Add Ads Optimization
    projects.push({
      id: Date.now() + Math.random(),
      title: 'Smart Ad Optimizer',
      description: 'AI-driven ad campaign manager that automatically adjusts bids and A/B tests creatives for maximum ROI.',
      category: 'ads',
      images: [generateRandomImage('AdsOptimization')],
      demoUrl: '#',
      createdAt: new Date().toISOString()
    });

    const data = { projects };

    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Successfully seeded ${projects.length} projects with actual demo URLs.`);

  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();
