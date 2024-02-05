"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clickTriggersRuleRoute = exports.getLanguageFromReq = exports.catchAllRedirectUrl = void 0;
function catchAllRedirectUrl() {
    if (process.env.CATCH_ALL_REDIRECT_URL) {
        return process.env.CATCH_ALL_REDIRECT_URL;
    }
    return 'https://bing.com';
}
exports.catchAllRedirectUrl = catchAllRedirectUrl;
function getLanguageFromReq(req) {
    const acceptLanguageHeader = req.get('Accept-Language');
    if (!acceptLanguageHeader) {
        return null;
    }
    // Parse the header to get an array of language tags with their associated quality values
    const languages = acceptLanguageHeader.split(',').map(language => {
        const [tag, quality = '1.0'] = language.trim().split(';q=');
        return { tag, quality: parseFloat(quality) };
    });
    // Sort languages by quality in descending order
    const sortedLanguages = languages.sort((a, b) => b.quality - a.quality);
    // The preferred language is the first language tag after sorting
    const preferredLanguage = sortedLanguages[0].tag;
    return preferredLanguage;
}
exports.getLanguageFromReq = getLanguageFromReq;
function clickTriggersRuleRoute(clickPropsFromReq, ruleRoute) {
    // Check to see if any of the click.clickprop values are included/exluded
    // from rule.data array. A Route.logicalRelation of 'and' means all rules must be satisfied,
    // while 'or' means at least one rule needs to be satisfied. Whether or not it should be included or exluded
    // is determined by rule.equals
    for (let i = 0; i < ruleRoute.rules.length; i++) {
        const rule = ruleRoute.rules[i];
        const clickProp = rule.clickProp;
        if (clickProp === null || clickProp === undefined || clickProp === 'affiliateNetwork_id'
            || clickProp === 'campaign_id' || clickProp === 'flow_id' || clickProp === 'landingPage_id'
            || clickProp === 'offer_id' || clickProp === 'trafficSource_id') {
            continue;
        }
        if (ruleRoute.logicalRelation === 'or') {
            const ruleItem = clickPropsFromReq[clickProp];
            if (typeof ruleItem === 'string' && rule.data.includes(ruleItem)) {
                return rule.equals ? true : false;
            }
        }
        else {
            const ruleItem = clickPropsFromReq[clickProp];
            if (typeof ruleItem === 'string' && rule.data.includes(ruleItem)) {
                continue;
            }
            if (i === ruleRoute.rules.length - 1) {
                return rule.equals ? true : false;
            }
            break;
        }
    }
    return false;
}
exports.clickTriggersRuleRoute = clickTriggersRuleRoute;
