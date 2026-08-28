import type {Metadata} from 'next';
import NavLinkFix from './nav-link-fix-client';
import LoginGate from './login-gate';
import './globals.css';import './checkout/checkout.css';import './admin/admin.css';import './table.css';import './cards.css';import './no-food-images.css';import './settings-form.css';import './login.css';
export const metadata:Metadata={title:'Godavari — Spice of Andhra',description:'Authentic Andhra food, delivered warm.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<NavLinkFix/><LoginGate/></body></html>}
