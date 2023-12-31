import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';

export const ssr = false;
inject({ mode: dev ? 'development' : 'production' });
