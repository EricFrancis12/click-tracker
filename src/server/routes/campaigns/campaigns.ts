import { fetchCampaigns, fetchCampaignBy_id } from '../../data/campaigns';

import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    const campaigns = await fetchCampaigns();
    res.json({ campaigns });
});

router.get('/:campaign_id', async (req, res) => {
    const campaign = await fetchCampaignBy_id(req.params.campaign_id);
    res.json({ campaign });
});

export { router };
