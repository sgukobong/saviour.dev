import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  caseStudy?: {
    problem: string;
    solution: string;
    impact: string;
    techStack: string[];
  };
  links?: {
    github?: string;
    live?: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export const getProjects = async (maxItems: number = 10): Promise<Project[]> => {
  try {
    const q = query(collection(db, 'projects'), limit(maxItems));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const getExperiences = async (): Promise<Experience[]> => {
  try {
    const q = query(collection(db, 'experiences'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Experience[];
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
};
