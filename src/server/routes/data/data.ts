import { fetchData } from '../../data/data';

import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    const data = await fetchData();
    res.json({ data });
});

export { router };
