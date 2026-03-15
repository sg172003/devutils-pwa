import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import JsonFormatter from './pages/JsonFormatter';
import DummyData from './pages/DummyData';
import JwtDecoder from './pages/JwtDecoder';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contributing from './pages/Contributing';
import Base64Tool from "./pages/Base64Tool";

export default function App() {
    return (
        <ThemeProvider>
            <ErrorBoundary>
                <BrowserRouter>
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                        <Navbar />
                        <main style={{ flex: 1 }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/json-formatter" element={<JsonFormatter />} />
                                <Route path="/dummy-data" element={<DummyData />} />
                                <Route path="/jwt-decoder" element={<JwtDecoder />} />
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                <Route path="/terms-of-service" element={<TermsOfService />} />
                                <Route path="/contributing" element={<Contributing />} />
                                <Route path="/base64" element={<Base64Tool />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                    <Analytics />
                </BrowserRouter>
            </ErrorBoundary>
        </ThemeProvider>
    );
}