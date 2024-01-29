import { fetchOffers, fetchOfferBy_id } from '../../data/data';

import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    const offers = await fetchOffers();
    res.json({ offers });
});

router.get('/:offer_id', async (req, res) => {
    const offer = await fetchOfferBy_id(req.params.offer_id);
    res.json({ offer });
});

export { router };
