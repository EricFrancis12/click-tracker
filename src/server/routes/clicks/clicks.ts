import { fetchClicks, fetchClickBy_id } from '../../data/clicks';

import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    const clicks = await fetchClicks();
    res.json({ clicks });
});

router.get('/:click_id', async (req, res) => {
    const click = await fetchClickBy_id(req.params.click_id);
    res.json({ click });
});

export { router };
