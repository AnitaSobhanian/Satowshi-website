/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { EPISODES } from './src/logic/tvData';
import { CASE_FILES } from './src/logic/caseFiles';
import { BOTTLE_CHARACTERS, TRUTH_QUESTIONS, DARE_CHALLENGES } from './src/logic/bottleGame';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API Endpoints
  // 1. Episodes API
  app.get('/api/episodes', (_req: Request, res: Response) => {
    res.json({
      success: true,
      data: EPISODES,
    });
  });

  app.get('/api/episodes/:id', (req: Request, res: Response) => {
    const ep = EPISODES.find((e) => e.id === req.params.id || String(e.channelNumber) === req.params.id);
    if (!ep) {
      res.status(404).json({ success: false, message: 'Episode not found' });
      return;
    }
    res.json({ success: true, data: ep });
  });

  // 2. Characters / Case Files API
  app.get('/api/characters', (req: Request, res: Response) => {
    const { status, q } = req.query;
    let list = CASE_FILES;
    if (status && typeof status === 'string' && status !== 'ALL') {
      list = list.filter((c) => c.status === status);
    }
    if (q && typeof q === 'string') {
      const query = q.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.alias.toLowerCase().includes(query) ||
          c.crime.toLowerCase().includes(query)
      );
    }
    res.json({ success: true, data: list, count: list.length });
  });

  app.get('/api/characters/:id', (req: Request, res: Response) => {
    const character = CASE_FILES.find((c) => c.id === req.params.id);
    if (!character) {
      res.status(404).json({ success: false, message: 'Character not found' });
      return;
    }
    res.json({ success: true, data: character });
  });

  // 3. Spin The Bottle Questions API
  app.get('/api/spin-questions', (req: Request, res: Response) => {
    const { type, characterId } = req.query;
    let pool = type === 'truth' ? TRUTH_QUESTIONS : type === 'dare' ? DARE_CHALLENGES : [...TRUTH_QUESTIONS, ...DARE_CHALLENGES];
    if (characterId && typeof characterId === 'string') {
      pool = pool.filter((q) => q.characterId === characterId);
    }
    res.json({
      success: true,
      characters: BOTTLE_CHARACTERS,
      questions: pool,
      totalCount: pool.length,
    });
  });

  // Serve static assets from public/assets if needed
  app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

  if (!isProd) {
    // Mount Vite middlewares in development
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production build from dist
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Satowshi server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
