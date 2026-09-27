import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, AlertCircle, RefreshCw } from 'lucide-react';

export const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4 matrix-grid">
      <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-emerald-500/40 shadow-2xl font-mono text-left">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs text-neutral-400">kernel-panic: gateway_unreachable</span>
          <div className="w-6" />
        </div>

        {/* Terminal Error Content */}
        <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
          <div className="flex items-center gap-2 text-red-400 font-bold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>ERROR 404: PACKET DROPPED AT INTERFACE</span>
          </div>

          <p className="text-neutral-400">
            $ traceroute {location.pathname}
          </p>
          <div className="pl-4 space-y-1 text-neutral-500 text-xs">
            <p>1 192.168.1.1 (gateway) 1.204 ms</p>
            <p>2 10.24.0.1 (ttu-core-router) 2.451 ms</p>
            <p className="text-red-400">3 * * * Destination host unreachable</p>
          </div>

          <p className="text-neutral-400 pt-2">
            The requested URI <span className="text-emerald-400 font-semibold">{location.pathname}</span> does not map to any active controller or route table.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs sm:text-sm hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
          >
            <Home className="w-4 h-4" />
            <span>cd /home/portfolio</span>
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/40 text-neutral-300 text-xs sm:text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>retry-connection</span>
          </button>
        </div>

      </div>
    </div>
  );
};
