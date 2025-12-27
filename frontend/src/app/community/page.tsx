import Header from '@/components/header/Header';
import CommunityContent from './Community';
import Footer from '@/components/footer/Footer';

export default async function CommunityPage() {
	return (
		<>
			<Header />
			<div className="dark:bg-slate-950 ">
				<CommunityContent />
			</div>
			<Footer />
		</>
	);
}
