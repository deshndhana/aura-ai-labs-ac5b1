import fs from 'fs/promises';
import path from 'path';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'websites' | 'chatbots' | 'social' | 'ads';
  images: string[]; // array of image URLs
  demoUrl?: string; // link to the actual HTML file or external demo
  createdAt: string;
}

const dbPath = path.join(process.cwd(), 'data', 'db.json');

// Initialize DB if it doesn't exist
async function initDb() {
  try {
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    try {
      await fs.access(dbPath);
    } catch {
      await fs.writeFile(dbPath, JSON.stringify({ projects: [] }, null, 2));
    }
  } catch (error) {
    console.error('Error initializing DB:', error);
  }
}

export async function getProjects(): Promise<Project[]> {
  await initDb();
  const data = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(data).projects;
}

export async function addProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
  const projects = await getProjects();
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  projects.push(newProject);
  await fs.writeFile(dbPath, JSON.stringify({ projects }, null, 2));
  return newProject;
}

export async function deleteProject(id: string): Promise<boolean> {
  let projects = await getProjects();
  const initialLength = projects.length;
  projects = projects.filter(p => p.id !== id);
  if (projects.length !== initialLength) {
    await fs.writeFile(dbPath, JSON.stringify({ projects }, null, 2));
    return true;
  }
  return false;
}
