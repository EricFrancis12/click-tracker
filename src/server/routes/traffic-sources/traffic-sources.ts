import { TTrafficSource } from '../../../client/src/lib/types';
import {
    fetchTrafficSources, fetchTrafficSourceBy_id,
    createNewAndSaveNewTrafficSource, updateTrafficSource, deleteTrafficSourceBy_id
} from '../../data/trafficSources';
import auth from '../../middleware/auth/auth';

import { Router } from 'express';
const router = Router();

router.get('/', auth, async (req, res) => {
    try {
        const trafficSources = await fetchTrafficSources();
        res.json({ trafficSources });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.get('/:trafficSource_id', auth, async (req, res) => {
    try {
        const trafficSource = await fetchTrafficSourceBy_id(req.params.trafficSource_id);
        res.json({ trafficSource });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const trafficSource: TTrafficSource = req.body;
        if (!trafficSource) {
            res.json({ success: false, message: 'Request body required' });
        }

        await createNewAndSaveNewTrafficSource(trafficSource);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.put('/:trafficSource_id', auth, async (req, res) => {
    try {
        const trafficSource: TTrafficSource = req.body;
        if (!trafficSource) {
            res.json({ success: false, message: 'Request body required' });
        }

        await updateTrafficSource(trafficSource);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.delete('/:trafficSource_id', auth, async (req, res) => {
    try {
        await deleteTrafficSourceBy_id(req.params.trafficSource_id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

export { router };
