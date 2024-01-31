import { TFlow } from '../../../client/src/lib/types';
import {
    fetchFlows, fetchFlowBy_id,
    createNewAndSaveNewFlow, updateFlow, deleteFlowBy_id
} from '../../data/flows';
import auth from '../../middleware/auth/auth';

import { Router } from 'express';
const router = Router();

router.get('/', auth, async (req, res) => {
    try {
        const flows = await fetchFlows();
        res.json({ flows });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.get('/:flow_id', auth, async (req, res) => {
    try {
        const flow = await fetchFlowBy_id(req.params.flow_id);
        res.json({ flow });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const flow: TFlow = req.body;
        if (!flow) {
            res.json({ success: false, message: 'Request body required' });
        }

        await createNewAndSaveNewFlow(flow);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.put('/:flow_id', auth, async (req, res) => {
    try {
        const flow: TFlow = req.body;
        if (!flow) {
            res.json({ success: false, message: 'Request body required' });
        }

        await updateFlow(flow);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

router.delete('/:flow_id', auth, async (req, res) => {
    try {
        await deleteFlowBy_id(req.params.flow_id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

export { router };
