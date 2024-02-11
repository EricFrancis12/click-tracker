import type {
    TFlow, TLandingPage, TOffer, TPath,
    TPath_landingPage, TPath_offer, TRoute
} from '../../../client/src/lib/types';
import { weightedRandomlySelectItem } from '../../../client/src/utils/utils';
import { createNewAndSaveNewClick, makeClickPropsFromReq, makeNewClickFromReq } from '../../data/clicks';
import { fetchData } from '../../data/data';
import { fetchFlowBy_id } from '../../data/flows';
import { catchAllRedirectUrl, clickTriggersRuleRoute } from '../../utils/utils';

import { Router } from 'express';
const router = Router();

router.get('/:campaign_id', async (req, res) => {
    try {
        if (!req.params.campaign_id) {
            res.redirect(catchAllRedirectUrl());
            return;
        }

        const data = await fetchData();
        const campaign = data.campaigns.find(_campaign => _campaign._id === req.params.campaign_id) ?? null;
        if (!campaign) {
            res.redirect(catchAllRedirectUrl());
            return;
        }

        const clickPropsFromReq = await makeClickPropsFromReq(req);
        let directLinkingEnabled: boolean | undefined = false;
        let flow: TFlow | undefined | null,
            route: TRoute | undefined | null,
            path: TPath | undefined | null,
            landingPage: TLandingPage | undefined | null,
            offer: TOffer | undefined | null,
            viewRedirectUrl: string | undefined | null,
            clickRedirectUrl: string | undefined | null;

        if (campaign.flow.type === 'url' && campaign.flow.url) {
            flow = campaign.flow;
            landingPage = null;
            offer = null;
            viewRedirectUrl = campaign.flow.url;
        } else {
            if (campaign.flow.type === 'saved' && campaign.flow._id) {
                flow = await fetchFlowBy_id(campaign.flow._id);
                if (!flow) {
                    viewRedirectUrl = catchAllRedirectUrl();
                }
            } else if (campaign.flow.type === 'built_in') {
                flow = campaign.flow;
            }

            if (flow) {
                if (flow.ruleRoutes && flow.ruleRoutes.length > 0) {
                    for (let i = 0; i < flow.ruleRoutes.length; i++) {
                        const ruleRoute = flow.ruleRoutes[i];
                        if (!ruleRoute.active) {
                            continue;
                        }
                        if (clickTriggersRuleRoute(clickPropsFromReq, ruleRoute)) {
                            route = ruleRoute;
                            break;
                        }
                        if (i === flow.ruleRoutes.length - 1) {
                            route = flow.defaultRoute;
                        }
                    }
                } else {
                    route = flow.defaultRoute;
                }
            }

            if (route) {
                path = weightedRandomlySelectItem(route.paths) as TPath;
            }

            if (path) {
                if (!path.directLinkingEnabled) {
                    directLinkingEnabled = false;
                    const selectedLandingPage_id = (weightedRandomlySelectItem(path.landingPages) as TPath_landingPage)?._id;
                    const selectedOffer_id = (weightedRandomlySelectItem(path.offers) as TPath_offer)?._id;
                    landingPage = data.landingPages.find(landingPage => landingPage._id === selectedLandingPage_id);
                    offer = data.offers.find(offer => offer._id === selectedOffer_id);
                    viewRedirectUrl = landingPage?.url ?? null;
                    clickRedirectUrl = offer?.url ?? null;
                } else {
                    directLinkingEnabled = true;
                    const selectedOffer_id = (weightedRandomlySelectItem(path.offers) as TPath_offer)?._id;
                    landingPage = null;
                    offer = data.offers.find(offer => offer._id === selectedOffer_id);
                    viewRedirectUrl = offer?.url ?? null;
                    clickRedirectUrl = offer?.url ?? null;
                }
            }

            const click = await makeNewClickFromReq({
                req,
                campaign,
                flow,
                landingPage,
                offer,
                directLinkingEnabled,
                clickPropsFromReq
            });

            if (click?._id) {
                res.cookie('click_id', click._id, { httpOnly: true });
            }

            console.log(campaign);
            console.log(flow);
            console.log(route);
            console.log(path);
            console.log(landingPage);
            console.log(offer);
            console.log(viewRedirectUrl);
            res.redirect(viewRedirectUrl ?? catchAllRedirectUrl());

            if (campaign && flow) {
                await createNewAndSaveNewClick(click);
            }
        }
    } catch (err) {
        console.error(err);
        res.redirect(catchAllRedirectUrl());
    }
});

export { router };
