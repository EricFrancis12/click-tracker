import { TLandingPage } from '../../../client/src/lib/types';
import {
    fetchLandingPages, fetchLandingPageBy_id,
    createNewAndSaveNewLandingPage, updateLandingPage, deleteLandingPageBy_id
} from '../../data/landingPages';
import auth from '../../middleware/auth/auth';

import { Router } from 'express';
const router = Router();

router.get('/', auth, async (req, res) => {
    try {
        const landingPages = await fetchLandingPages();
        res.json({ landingPages });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.get('/:landingPage_id', auth, async (req, res) => {
    try {
        const landingPage = await fetchLandingPageBy_id(req.params.landingPage_id);
        res.json({ landingPage });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const landingPage: TLandingPage = req.body;
        if (!landingPage) {
            res.json({ success: false, message: 'Request body required' });
        }

        await createNewAndSaveNewLandingPage(landingPage);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.put('/:landingPage_id', auth, async (req, res) => {
    try {
        const landingPage: TLandingPage = req.body;
        if (!landingPage) {
            res.json({ success: false, message: 'Request body required' });
        }

        await updateLandingPage(landingPage);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.delete('/:landingPage_id', auth, async (req, res) => {
    try {
        await deleteLandingPageBy_id(req.params.landingPage_id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

export { router };
