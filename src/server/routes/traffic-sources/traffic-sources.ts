import { fetchTrafficSources, fetchTrafficSourceBy_id } from '../../data/data';

import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    const trafficSources = await fetchTrafficSources();
    res.json({ trafficSources });
});

router.get('/:trafficSource_id', async (req, res) => {
    const trafficSource = await fetchTrafficSourceBy_id(req.params.trafficSource_id);
    res.json({ trafficSource });
});

export { router };
