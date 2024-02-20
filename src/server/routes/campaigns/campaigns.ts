import { TCampaign } from '../../../client/src/lib/types';
import {
    fetchCampaigns, fetchCampaignBy_id,
    createNewAndSaveNewCampaign, updateCampaign, deleteCampaignBy_id
} from '../../data/campaigns';
import auth from '../../middleware/auth/auth';

import { Router } from 'express';
const router = Router();

router.get('/', auth, async (req, res) => {
    try {
        const campaigns = await fetchCampaigns();
        res.json({ campaigns });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.get('/:campaign_id', auth, async (req, res) => {
    try {
        const campaign = await fetchCampaignBy_id(req.params.campaign_id);
        res.json({ campaign });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const campaign: TCampaign = req.body;
        if (!campaign) {
            res.json({ success: false, message: 'Request body required' });
        }

        await createNewAndSaveNewCampaign(campaign);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.put('/:campaign_id', auth, async (req, res) => {
    try {
        const campaign: TCampaign = req.body;
        if (!campaign) {
            res.json({ success: false, message: 'Request body required' });
        }

        await updateCampaign(campaign);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.delete('/:campaign_id', auth, async (req, res) => {
    try {
        await deleteCampaignBy_id(req.params.campaign_id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

export { router };
