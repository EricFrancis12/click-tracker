import { useAuth } from '../contexts/AuthContext';
import BlackTransparentOverlay from './BlackTransparentOverlay';
import { Footer } from './menu-components';
import type { TCampaign, TTrafficSource } from '../lib/types';
import { tokensDictionary } from '../lib/tokensList';

export default function CampaignLinksMenu({ campaign, onClose }: {
    campaign: TCampaign,
    onClose: React.MouseEventHandler<HTMLDivElement>
}) {
    const { data } = useAuth();

    function generateCampaignLinks(campaign: TCampaign) {
        const campaignUrl = `${window.location.protocol}//${window.location.hostname}/t/${campaign._id}`;
        const clickUrl = `${window.location.protocol}//${window.location.hostname}/clk`;
        const postbackUrl = `${window.location.protocol}//${window.location.hostname}/postback/REPLACE?payout=OPTIONAL`;
        return {
            campaignUrl,
            clickUrl,
            postbackUrl
        };
    }
    const campaignLinks = generateCampaignLinks(campaign);

    return (
        <BlackTransparentOverlay layer={2} className='flex justify-center items-start p-4'>
            <div
                className='flex flex-col justify-between items-center h-full w-full max-h-[90vh] max-w-[700px] text-black bg-white'
                style={{
                    borderRadius: '5px'
                }}
            >
                <div>
                    <p>
                        campaignUrl: {campaignLinks.campaignUrl}
                    </p>
                    <p>
                        clickUrl: {campaignLinks.clickUrl}
                    </p>
                    <p>
                        postbackUrl: {campaignLinks.postbackUrl}
                    </p>
                </div>

                <Footer onClose={onClose} />
            </div>
        </BlackTransparentOverlay>
    )
}
