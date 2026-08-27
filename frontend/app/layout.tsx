import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'Godavari — Spice of Andhra',description:'Authentic Andhra food, delivered warm.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
