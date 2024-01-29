import { TAffiliateNetwork } from '../../../client/src/lib/types';
import {
    fetchAffiliateNetworks, fetchAffiliateNetworkBy_id,
    createNewAndSaveNewAffiliateNetwork, updateAffiliateNetwork, deleteAffiliateNetworkBy_id
} from '../../data/affiliateNetworks';

import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    try {
        const affiliateNetworks = await fetchAffiliateNetworks();
        res.json({ affiliateNetworks });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.get('/:affiliateNetwork_id', async (req, res) => {
    try {
        const affiliateNetwork = await fetchAffiliateNetworkBy_id(req.params.affiliateNetwork_id);
        res.json({ affiliateNetwork });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.post('/', async (req, res) => {
    try {
        const affiliateNetwork: TAffiliateNetwork = req.body;
        if (!affiliateNetwork) {
            res.json({ success: false, message: 'Request body required' });
        }

        await createNewAndSaveNewAffiliateNetwork(affiliateNetwork);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.put('/:affiliateNetwork_id', async (req, res) => {
    try {
        const affiliateNetwork: TAffiliateNetwork = req.body;
        if (!affiliateNetwork) {
            res.json({ success: false, message: 'Request body required' });
        }

        await updateAffiliateNetwork(affiliateNetwork);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.delete('/:affiliateNetwork_id', async (req, res) => {
    try {
        await deleteAffiliateNetworkBy_id(req.params.affiliateNetwork_id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

export { router };
