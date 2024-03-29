import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import BlackTransparentOverlay from '../BlackTransparentOverlay';
import useKeypress from '../../hooks/useKeypress';
import useWindowResize from '../../hooks/useWindowResize';
import type { TCampaign } from '../../lib/types';
import { Modal, Header } from '../menu-components';
import Button from '../Button';
import { generateCampaignLinks, copyTextToClipboard } from '../../utils/utils';

export default function CampaignLinksMenu({ campaign, onClose }: {
    campaign: TCampaign,
    onClose: Function
}) {
    const { data } = useAuth();

    const trafficSource = campaign?.trafficSource_id
        ? data?.trafficSources?.find(_trafficSource => _trafficSource._id === campaign.trafficSource_id)
        : null;
    const campaignLinks = generateCampaignLinks({ campaign, trafficSource });

    useKeypress('escape', () => onClose());
    useWindowResize(() => onClose());

    return (
        <BlackTransparentOverlay layer={2} className='flex justify-center items-start p-4'>
            <Modal>
                <Header
                    title='Campaign Links'
                    onClose={() => onClose()}
                />
                <div className='flex flex-col justify-between items-center min-h-[50vh] max-h-[90vh] p-4'>
                    <div className='flex flex-col justify-start items-center gap-4 w-full mb-4'>
                        {campaign?.name &&
                            <Card title='Campaign Name' value={campaign.name} />
                        }
                        <Card title='Campaign Url' value={campaignLinks.campaignUrl} />
                        <Card title='Click Url' value={campaignLinks.clickUrl} />
                        <Card title='Postback Url' value={campaignLinks.postbackUrl} />
                    </div>
                    <Button text='Close' onClick={() => onClose()} />
                </div>
            </Modal>
        </BlackTransparentOverlay>
    )
}

const Card = ({ title, value }: {
    title: string,
    value: string
}) => (
    <>
        <div className='flex justify-between items-center gap-2 w-full'>
            <div>
                <h2 className='font-bold'>
                    {title}
                </h2>
                <p>
                    {value}
                </p>
            </div>
            <div
                className='text-green-500 hover:opacity-70 cursor-pointer'
                style={{
                    whiteSpace: 'nowrap'
                }}
                onClick={() => copyTextToClipboard(value)}
            >
                <FontAwesomeIcon icon={faCopy} />
                <span className='ml-2'>
                    Copy
                </span>
            </div>
        </div>
        <div
            className='w-full'
            style={{
                borderBottom: 'solid black 1px'
            }}
        />
    </>
);
