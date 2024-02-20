import { fetchData } from '../../data/data';

import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    try {
        const data = await fetchData();
        res.json({ data });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

export { router };
