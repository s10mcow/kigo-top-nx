import { SessionExpiredContainer } from '@kigo-top/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Session expired | Local+ Offers',
  description: 'Local+ Offers',
};

export default function page() {
  return <SessionExpiredContainer />;
}
