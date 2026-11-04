import { getFooterData } from '@/services/content.service';
import FooterClient from './FooterClient';

export default async function Footer() {
    const data = await getFooterData();
    return <FooterClient data={data} />;
}
