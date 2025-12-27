import Header from '@/components/header/Header';
import Signup from './Signup';
import Footer from '@/components/footer/Footer';

export default async function SignupPage() {
	return (
		<>
			<Header />
			<div className="dark:bg-slate-950 ">
				<Signup />
			</div>
			<Footer />
		</>
	);
}
