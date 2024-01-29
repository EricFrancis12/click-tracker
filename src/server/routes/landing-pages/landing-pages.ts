import { fetchLandingPages, fetchLandingPageBy_id } from '../../data/landingPages';

import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    const landingPages = await fetchLandingPages();
    res.json({ landingPages });
});

router.get('/:landingPage_id', async (req, res) => {
    const landingPage = await fetchLandingPageBy_id(req.params.landingPage_id);
    res.json({ landingPage });
});

export { router };
