import { fetchClickBy_id, recordConversion } from '../../data/clicks';

import { Request, Response, Router } from 'express';
const router = Router();

router.get('/:click_id', postback);
router.post('/:click_id', postback);

async function postback(req: Request, res: Response) {
    res.json({});

    try {
        const click = await fetchClickBy_id(req.params.click_id);
        if (!click) {
            return;
        }

        const revenue = parseFloat(req.query?.payout as string ?? 0);
        recordConversion({ click, revenue });
    } catch (err) {
        console.error(err);
    }
}

export { router };
