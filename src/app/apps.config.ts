export interface AppsConfig {
    title: string;
    name: string;
    path: string;
    url: string;
    devUrl?: string;
  }
  
  export function getApps(): AppsConfig[] {
    return [
      {
        title: 'MicroFrontend One',
        name: 'mf-one',
        path: 'mf-one',
        url: 'http://localhost:3333',
        // devUrl: 'http://localhost:3333',
      },
      {
        title: 'MicroFrontend Beta',
        name: 'beta',
        path: 'beta',
        url: 'http://mkotas.cz/micro-frontend-beta',
        // devUrl: 'http://localhost:4444',
      },
    ];
  }