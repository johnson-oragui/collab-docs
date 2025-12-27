import Header from '@/components/header/Header';
import PrivacyContent from './Privacy';
import Footer from '@/components/footer/Footer';

export default async function PrivacyPage() {
	return (
		<>
			<Header />
			<div className="dark:bg-slate-950 ">
				<PrivacyContent />
			</div>
			<Footer />
		</>
	);
}
