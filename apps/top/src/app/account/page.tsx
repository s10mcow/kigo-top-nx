import { Metadata } from 'next';
import AccountContainer from './AccountContainer';

export const metadata: Metadata = {
  title: 'Account | Local+ Offers',
  description: 'Local+ Offers',
};

export default function page() {
  return <AccountContainer />;
}
