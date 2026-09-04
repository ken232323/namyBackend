import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export function resourceRouter(collectionName) {
  const router = Router();

  router.get('/', (req, res) => {
    res.json(getAll(collectionName));
  });

  router.get('/:id', (req, res) => {
    const item = getById(collectionName, req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  });

  router.post('/', requireAuth, (req, res) => {
    res.status(201).json(create(collectionName, req.body));
  });

  router.put('/:id', requireAuth, (req, res) => {
    const updated = update(collectionName, req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  });

  router.delete('/:id', requireAuth, (req, res) => {
    const ok = remove(collectionName, req.params.id);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  });

  return router;
}
