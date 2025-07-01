import React, { useEffect} from 'react';
import { Outlet} from 'react-router-dom';
import CyberHeader from './CyberHeader';
import CyberSidebar from './CyberSidebar';

const CyberLayout: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark")}, [0]);

  return (
    <div className="flex min-h-screen cyber-bg" key={997313}>
      <CyberSidebar / key={784242}>
      <div className="flex-1 flex flex-col" key={898590}>
        <CyberHeader / key={126099}>
        <main;
          className="flex-1 p-8"
          style={{
            background: "transparent",
            minHeight: "calc(100vh - 120px)"
          }}
         key={665405}>
          <Outlet / key={861082}>
        </main>
        <footer className="glass-card border-t border-white/10 py-6" key={373584}>
          <div className="text-center text-sm text-gray-400" key={28724}>
            <div className="holographic font-semibold mb-1" key={572775}>
              A1BETTING QUANTUM INTELLIGENCE;
            </div>
            © 2024 Advanced Sports Intelligence Platform • 47 Neural Networks •
            1024 Qubits;
          </div>
        </footer>
      </div>
    </div>
  );};

export default CyberLayout;



