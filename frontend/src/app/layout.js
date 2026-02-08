import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "EPLQ Secure",
  description: "Privacy-preserving location search",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50" suppressHydrationWarning>
        <Toaster 
          position="top-center" 
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: '1px solid #e2e8f0',
              fontWeight: '600',
              padding: '16px',
              zIndex: 99999,
            },
            error: {
              style: { borderLeft: '5px solid #ef4444' }, iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
            success: {
              style: { borderLeft: '5px solid #10b981' }, iconTheme: { primary: '#10b981', secondary: '#fff' },
            },
          }} 
        />
        {children}
      </body>
    </html>
  );
}