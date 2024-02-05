import { catchAllRedirectUrl } from '../../utils/utils';
import { fetchClickBy_id, recordLandingPageClick } from '../../data/clicks';

import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    let clickRedirectUrl, click;
    const click_id = req.signedCookies.click_id || req.cookies.click_id;

    try {
        if (click_id) {
            click = await fetchClickBy_id(click_id);
        }
        clickRedirectUrl = click?.clickRedirectUrl ? click.clickRedirectUrl : null;
        res.redirect(clickRedirectUrl || catchAllRedirectUrl());

        if (click) {
            recordLandingPageClick({
                click,
                campaign_id: click.campaign_id
            });
        }
    } catch (err) {
        console.error(err);
        res.redirect(catchAllRedirectUrl());
    }
});

export { router };
