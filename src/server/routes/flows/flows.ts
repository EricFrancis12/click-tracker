import { fetchFlows, fetchFlowBy_id } from '../../data/data';

import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    const flows = await fetchFlows();
    res.json({ flows });
});

router.get('/:flow_id', async (req, res) => {
    const flow = await fetchFlowBy_id(req.params.flow_id);
    res.json({ flow });
});

export { router };
