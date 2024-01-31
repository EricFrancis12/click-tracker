import { TOffer } from '../../../client/src/lib/types';
import {
    fetchOffers, fetchOfferBy_id,
    createNewAndSaveNewOffer, updateOffer, deleteOfferBy_id
} from '../../data/offers';
import auth from '../../middleware/auth/auth';

import { Router } from 'express';
const router = Router();

router.get('/', auth, async (req, res) => {
    try {
        const offers = await fetchOffers();
        res.json({ offers });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.get('/:offer_id', auth, async (req, res) => {
    try {
        const offer = await fetchOfferBy_id(req.params.offer_id);
        res.json({ offer });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const offer: TOffer = req.body;
        if (!offer) {
            res.json({ success: false, message: 'Request body required' });
        }

        await createNewAndSaveNewOffer(offer);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.put('/:offer_id', auth, async (req, res) => {
    try {
        const offer: TOffer = req.body;
        if (!offer) {
            res.json({ success: false, message: 'Request body required' });
        }

        await updateOffer(offer);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.delete('/:offer_id', auth, async (req, res) => {
    try {
        await deleteOfferBy_id(req.params.offer_id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

export { router };
