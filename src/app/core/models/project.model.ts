export interface Project {
  id:          string;
  title:       string;
  description: string;
  type:        string;
  status:      'live' | 'wip' | 'archived';
  stack:       string[];
  links: {
    demo?:   string;
    github?: string;
    docs?:   string;
  };
  featured: boolean;
}
