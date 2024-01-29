export type TAffiliateNetwork_id = `${string}_AN`;
export type TCampaign_id = `${string}_CA`;
export type TTrafficSource_id = `${string}_TS`;
export type TLandingPage_id = `${string}_LP`;
export type TLandingPage_id_direct_linking = 'DIRECT_LINKING_LP';
export type TOffer_id = `${string}_${string}_OF`;
export type TFlow_id = `${string}_FL`;
export type TClick_id = `${string}_CL`;

export type TItems = {
    name: TItemName
};
export type TItemName = 'Campaigns' | 'Offers' | 'Landing Pages' | 'Flows' | 'Traffic Sources' | 'Affiliate Networks'
    | 'Conversions' | 'Postbacks' | 'Countries' | 'Languages' | 'Cities' | 'States / Regions' | 'ISP' | 'Mobile Carriers'
    | 'Connection Types' | 'Devices' | 'Device Models' | 'Device Vendors' | 'Device Types' | 'Screen Resolutions'
    | 'OS' | 'OS Versions' | 'Browsers' | 'Browser Names' | 'Browser Versions' | 'Errors';

export type TClick = {
    created?: string,
    updated?: string,
    _id: TClick_id,
    campaign_id: TCampaign_id,
    trafficSource_id: TTrafficSource_id,
    landingPage_id: TLandingPage_id | TLandingPage_id_direct_linking,
    offer_id: TOffer_id | null,
    flow_id: TFlow_id,
    viewTimestamp: number,
    lpClickTimestamp: number | null,
    conversionTimestamp: number | null,
    cost: number,
    revenue: number,
    tokens: {
        key: string,
        value: string
    }[],
    viewRedirectUrl: string,
    clickRedirectUrl: string | null,
    ip?: string | null,
    userAgent?: string | null,
    language?: string | null,
    country?: string | null,
    region?: string | null,
    city?: string | null,
    isp?: string | null,
    mobileCarrier?: string | null,
    connectionType?: string | null,
    deviceModel?: string | null,
    deviceVendor?: string | null,
    deviceType?: string | null,
    screenResolution?: string | null,
    os?: string | null,
    osVersion?: string | null,
    browserName?: string | null,
    browserVersion?: string | null
};
export type TClickProp = 'country' | 'region' | 'city' | 'language' | 'asp' | 'mobileCarrier' | 'connectionType'
    | 'deviceModel' | 'deviceVendor' | 'deviceType' | 'screenResolution' | 'os' | 'osVersion' | 'browserName'
    | 'browserVersion';

export type TAffiliateNetwork = {
    _id: TAffiliateNetwork_id,
    name: string,
    defaultNewOfferString: string,
    tags?: string[],
    created?: string,
    updated?: string
};

export type TCampaign = {
    _id: TCampaign_id,
    name: string,
    trafficSource_id: TTrafficSource_id,
    landingPageRotation: TLandingPageRotation,
    offerRotation: TOfferRotation,
    flow: TFlow,
    geo?: TGeoName,
    tags?: string[],
    created?: string,
    updated?: string
};

export type TTrafficSource = {
    _id: TTrafficSource_id,
    name: string,
    postbackUrl: string,
    defaultTokens: TToken[],
    tags?: string[],
    created?: string,
    updated?: string
};

export type TLandingPage = {
    _id: TLandingPage_id,
    name: string,
    url: string,
    tags?: string[],
    created?: string,
    updated?: string
};

export type TOffer = {
    _id: TOffer_id,
    name: string,
    affiliateNetwork_id: TAffiliateNetwork_id,
    url: string,
    payout: number,
    tags?: string[],
    created?: string,
    updated?: string
};

export type TFlow = {
    name?: string,
    _id: TFlow_id,
    type: TFlowType,
    defaultRoute?: TRoute_default,
    ruleRoutes?: TRoute_rule[],
    url?: string,
    tags?: string[],
    created?: string,
    updated?: string
};
export type TFlowType = 'saved' | 'built_in' | 'url';
export type TFlow_saved = TFlow & {
    type: 'saved',
    _id: TFlow_id
};
export type TFlow_built_in = TFlow & {
    type: 'built_in',
    _id: 'BUILT_IN_FL',
    defaultRoute: TRoute_default,
    ruleRoutes: TRoute_rule[],
};
export type TFlow_url = TFlow & {
    type: 'url',
    _id: 'URL_FL',
    url: string
};

export type TRoute = {
    active: boolean,
    rules?: TRule[] | null,
    paths: TPath[]
};
export type TRoute_default = TRoute & {
    rules?: null
};
export type TRoute_rule = TRoute & {
    rules: TRule[]
};

export type TPath = {
    weight: number,
    landingPages: {
        _id: TLandingPage_id,
        weight: number
    },
    offers: {
        _id: TOffer_id,
        weight: number
    },
    active: boolean,
    directLinkingEnabled: boolean
};

export type TRule = {
    name: TRule_name,
    itemName: TItemName,
    clickprop: TClickProp,
    equals: boolean,
    data: string[]
};
export type TRule_name = 'Country' | 'State / Region' | 'City' | 'Language' | 'ISP' | 'Mobile Carrier' | 'Connection Type'
    | 'Device Model' | 'Device Vendor' | 'Device Type' | 'Screen Resolution' | 'OS' | 'OS Version' | 'Browser Name'
    | 'Browser Version' | 'Day of the Week';

export type TGeo = {
    name: TGeoName
};
export type TGeoName = string;

export type TToken = {
    name: string,
    key: string,
    value: string
};

export type TLandingPageRotation = 'random';
export type TOfferRotation = 'random';
