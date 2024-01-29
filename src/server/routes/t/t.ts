import type { TClick } from '../../../client/src/lib/types';
import { fetchCampaignBy_id, fetchFlowBy_id } from '../../data/data';
import { catchAllRedirectUrl, makeNewClickFromReq } from '../../utils/utils';

import { Router } from 'express';
const router = Router();

router.get('/:campaign_id', async (req, res) => {
    const campaign = await fetchCampaignBy_id(req.params.campaign_id);
    if (!campaign) {
        return res.redirect(catchAllRedirectUrl());
    }

    const click: TClick = makeNewClickFromReq({ req, campaign }); /

    let flow;
    // Handle based on flow type
    if (campaign.flow.type === 'saved') {
        flow = await fetchFlowBy_id(campaign.flow._id);
    } else if (campaign.flow.type === 'built_in') {
        flow = campaign.flow;
    } else if (campaign.flow.type === 'url' && campaign.flow.url) {
        res.redirect(campaign.flow.url);
    } else {
        res.redirect(catchAllRedirectUrl());
    }

    if (flow) {
        if (flow.ruleRoutes) {
            // determine if the request triggers any ruleRoutes
            for (let i = 0; i < flow.ruleRoutes?.length; i++) {

            }
        }
        // if so, the first one triggered gets the redirect
        // if not, the redirect goes to the defaultRoute

        // now that we've chosen a route, use flow.path.active, flow.path.weight to selelct a path
        // if !flow.path.directLinkingEnabled, select a landingPage based on flow.path.landingPaths[i].weight
        // else, select an offer based on flow.path.offers[i].weight
    }

    // log click data in db
});

export { router };
