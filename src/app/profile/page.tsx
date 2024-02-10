import { Metadata } from 'next';
import CheckProfileExists from './checkProfileExists';

export const metadata: Metadata = {
  title: 'Account Creation',
};

export default function Page() {
	return (
		<CheckProfileExists/>
	)
}