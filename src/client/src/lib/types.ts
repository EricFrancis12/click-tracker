export type TAffiliateNetwork_id = `${string}_AN`;
export type TCampaign_id = `${string}_CA`;
export type TTrafficSource_id = `${string}_TS`;
export type TLandingPage_id = `${string}_LP`;
export type TLandingPage_id_direct_linking = 'DIRECT_LINKING_LP';
export type TOffer_id = `${string}_OF`;
export type TFlow_id = `${string}_FL`;
export type TClick_id = `${string}_CL`;

export type THttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type TItem = {
    name: TItemName,
    clickProp?: TClickProp,
    dataProp?: TDataProp
};

export type TItemName = TItemName_primary | TItemName_secondary;
export type TItemName_primary = 'Affiliate Networks' | 'Campaigns' | 'Flows' | 'Landing Pages' | 'Offers' | 'Traffic Sources';
export type TItemName_secondary = 'Countries' | 'Cities' | 'States / Regions' | 'Languages' | 'ISP' | 'Mobile Carriers'
    | 'Connection Types' | 'Device Models' | 'Device Vendors' | 'Device Types' | 'Screen Resolutions'
    | 'OS' | 'OS Versions' | 'Browser Names' | 'Browser Versions';

export type TClickProp = 'affiliateNetwork_id' | 'campaign_id' | 'flow_id' | 'landingPage_id' | 'offer_id' | 'trafficSource_id'
    | 'geoName' | 'region' | 'city' | 'language' | 'isp' | 'mobileCarrier' | 'connectionType' | 'deviceModel'
    | 'deviceVendor' | 'deviceType' | 'screenResolution' | 'os' | 'osVersion' | 'browserName' | 'browserVersion'
    | null;

export type TClickPropsFromReq = {
    geoName?: string | null,
    region?: string | null,
    city?: string | null,
    language?: string | null,
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

export type TDataProp = 'affiliateNetworks' | 'campaigns' | 'flows' | 'landingPages' | 'offers' | 'trafficSources';

export type TClick = {
    created?: string,
    updated?: string,
    _id: TClick_id,
    campaign_id: TCampaign_id,
    trafficSource_id: TTrafficSource_id | '',
    landingPage_id: TLandingPage_id | TLandingPage_id_direct_linking | null,
    offer_id: TOffer_id | null,
    flow_id: TFlow_id,
    viewTimestamp: number,
    lpClickTimestamp: number | null,
    conversionTimestamp: number | null,
    cost: number,
    revenue: number,
    tokens: {
        queryParam: string,
        value: string
    }[],
    viewRedirectUrl: string | null,
    clickRedirectUrl: string | null,
    ip?: string | null,
    userAgent?: string | null,
    language?: string | null,
    geoName?: string | null,
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
    trafficSource_id: TTrafficSource_id | '',
    landingPageRotation: TLandingPageRotation,
    offerRotation: TOfferRotation,
    flow: TFlow,
    geoName?: TGeoName,
    tags?: string[],
    created?: string,
    updated?: string
};

export type TTrafficSource = {
    _id: TTrafficSource_id,
    name: string,
    postbackUrl: string,
    defaultTokens: TToken[],
    customTokens: TToken[],
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
    affiliateNetwork_id: TAffiliateNetwork_id | '',
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
    ruleRoutes: TRoute_rule[]
};
export type TFlow_url = TFlow & {
    type: 'url',
    _id: 'URL_FL',
    url: string
};

export type TRoute = {
    active: boolean,
    rules?: TRule[] | null,
    logicalRelation?: TLogicalRelation,
    paths: TPath[]
};
export type TRoute_default = TRoute & {
    rules?: null
};
export type TRoute_rule = TRoute & {
    rules: TRule[],
    logicalRelation: TLogicalRelation
};

export type TPath = {
    weight: number,
    landingPages: TPath_landingPage[],
    offers: TPath_offer[],
    active: boolean,
    directLinkingEnabled: boolean
};
export type TPath_landingPage = {
    _id: TLandingPage_id,
    weight: number
};
export type TPath_offer = {
    _id: TOffer_id,
    weight: number
};

export type TRule = {
    name: TRule_name,
    itemName: TItemName | null,
    clickProp: TClickProp,
    equals: boolean,
    data: string[]
};
export type TRule_name = 'Country' | 'State / Region' | 'City' | 'Language' | 'ISP' | 'Mobile Carrier' | 'Connection Type'
    | 'Device Model' | 'Device Vendor' | 'Device Type' | 'Screen Resolution' | 'OS' | 'OS Version' | 'Browser Name'
    | 'Browser Version' | 'Days of the Week';

export type TGeo = {
    name: TGeoName
};
export type TGeoName = string;

export type TToken = {
    queryParam: string,
    value: string
    name?: string,
};

export type TLandingPageRotation = 'random';
export type TOfferRotation = 'random';

export type TTimeframe = [Date, Date];
export type TTimeframeName = 'Today' | 'Yesterday' | 'Last 3 Days' | 'Last 7 Days' | 'Last 30 Days'
    | 'This Month' | 'Last Month' | 'Max Available' | 'Date Range';

export type TMappedData = TMappedDataItem[];
export type TMappedDataItem = ((TAffiliateNetwork | TCampaign | TFlow | TLandingPage | TOffer | TTrafficSource) & {
    clickProp: TClickProp,
    clicks: TClick[],
    selected?: boolean,
    x?: number,
    y?: number,
    report?: boolean,
    deepMappedData?: TMappedData | null
});

export type TReportChain = [TReportChainItem, TReportChainItem | null, TReportChainItem | null];
export type TReportChainItem = {
    name: TItemName | null
};

export type TMenuData = TAffiliateNetwork | TCampaign | TFlow | TLandingPage | TOffer | TTrafficSource | undefined | null;

export type TReportItem = TItem;
export type TReportDataItem = TAffiliateNetwork | TCampaign | TFlow | TLandingPage | TOffer | TTrafficSource;

export type TLogicalRelation = 'and' | 'or';

export type TRulesListItem = {
    name: TRule_name,
    itemName: TItemName | null,
    clickProp: TClickProp,
    component: ({ rule, rules, setRules, onDelete }: {
        rule: TRule,
        rules: TRule[],
        setRules: Function,
        onDelete: React.MouseEventHandler<HTMLSpanElement>
    }) => JSX.Element
};
