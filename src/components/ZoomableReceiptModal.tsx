import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  RefreshCw,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Building,
  Calendar,
  Receipt,
  User,
  Hash,
} from 'lucide-react';
import { Transaction } from '../types';

interface ZoomableReceiptModalProps {
  tx: Transaction;
  onClose: () => void;
  isAdmin?: boolean;
  onApprove?: (txId: string) => void;
  onReject?: (txId: string) => void;
}

const formatLkr = (amount: number) =>
  `Rs. ${amount.toLocaleString('en-LK', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

export default function ZoomableReceiptModal({
  tx,
  onClose,
  isAdmin = false,
  onApprove,
  onReject,
}: ZoomableReceiptModalProps) {
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Copy helper
  const handleCopy = (label: string, text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedField(label);
    setTimeout(() => {
      setCopiedField((curr) => (curr === label ? null : curr));
    }, 2000);
  };

  // Zoom handlers with boundaries
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(5, +(prev + 0.35).toFixed(2)));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(0.75, +(prev - 0.35).toFixed(2));
      if (next <= 1) {
        setPan({ x: 0, y: 0 });
      }
      return next;
    });
  }, []);

  const handleRotateCw = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const handleRotateCcw = useCallback(() => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setRotation(0);
    setPan({ x: 0, y: 0 });
  }, []);

  // Double click toggles between 1x and 2.5x
  const handleDoubleClick = () => {
    if (zoom > 1.2) {
      handleReset();
    } else {
      setZoom(2.5);
    }
  };

  // Wheel to zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Mouse pan handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch pan handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom <= 1 || e.touches.length === 0) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    const touch = e.touches[0];
    setPan({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key.toLowerCase() === 'r') {
        handleRotateCw();
      } else if (e.key === '0') {
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handleZoomIn, handleZoomOut, handleRotateCw, handleReset]);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'w-[98vw] h-[96vh]' : 'w-full max-w-5xl h-[88vh] max-h-[850px]'
        }`}
      >
        {/* TOP BAR / HEADER */}
        <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Deposit Receipt Inspector
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    tx.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : tx.status === 'pending'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {tx.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {tx.userName} · <span className="text-teal-400 font-bold">{formatLkr(tx.amountLkr)}</span>
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowDetails((prev) => !prev)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 ${
                showDetails
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Toggle Slip Information"
            >
              <span>Slip Info</span>
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-rose-600 rounded-xl transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MAIN BODY: VIEWPORT + DETAILS SIDEBAR */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {/* IMAGE VIEWPORT */}
          <div
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleDoubleClick}
            className={`flex-1 relative bg-slate-950 flex items-center justify-center overflow-hidden select-none ${
              zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
            }`}
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            {tx.receiptUrl ? (
              <div
                className="transition-transform duration-75 origin-center will-change-transform max-w-full max-h-full flex items-center justify-center p-4"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                }}
              >
                <img
                  src={tx.receiptUrl}
                  alt={`Deposit Receipt Slip for ${tx.userName}`}
                  draggable={false}
                  className="max-h-[68vh] max-w-full object-contain rounded-xl shadow-2xl pointer-events-none ring-1 ring-white/10"
                />
              </div>
            ) : (
              <div className="text-center p-8 text-slate-500">
                <AlertTriangle className="w-12 h-12 mx-auto mb-2 text-amber-500" />
                <p className="text-sm font-semibold">No receipt image attached to this transaction</p>
              </div>
            )}

            {/* FLOATING ZOOM CONTROLS TOOLBAR */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl px-3 py-2 flex items-center gap-1.5 shadow-2xl">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 0.75}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-teal-300 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Click to reset zoom"
              >
                {Math.round(zoom * 100)}%
              </button>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 5}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-slate-700 mx-1" />

              <button
                type="button"
                onClick={handleRotateCcw}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Rotate Left 90°"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleRotateCw}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Rotate Right 90° (R)"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Reset View (0)"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom helper hint badge */}
            <div className="hidden sm:block absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-[11px] text-slate-400 px-2.5 py-1 rounded-lg border border-white/5 pointer-events-none">
              Scroll to zoom · Drag to pan · Double-click to toggle
            </div>
          </div>

          {/* DETAILS SIDEBAR */}
          {showDetails && (
            <div className="w-full md:w-80 lg:w-96 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between shrink-0 p-5 overflow-y-auto max-h-[35vh] md:max-h-full">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    Receipt Slip Verification Data
                  </span>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    {/* Amount */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Claimed Amount:</span>
                      <span className="text-base font-bold font-mono text-emerald-400">
                        {formatLkr(tx.amountLkr)}
                      </span>
                    </div>

                    {/* Member */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span>Member:</span>
                      </span>
                      <span className="font-semibold text-slate-200">{tx.userName}</span>
                    </div>

                    {/* Destination Bank */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-500" />
                        <span>Receiving Bank:</span>
                      </span>
                      <span className="font-semibold text-slate-200 truncate max-w-[160px]">
                        {tx.depositBankName || tx.method || 'Company Bank'}
                      </span>
                    </div>

                    {/* Reference ID with Copy */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-slate-500" />
                        <span>Reference No:</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-teal-400">{tx.referenceNo || 'None'}</span>
                        {tx.referenceNo && (
                          <button
                            type="button"
                            onClick={() => handleCopy('ref', tx.referenceNo || '')}
                            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Copy reference number"
                          >
                            {copiedField === 'ref' ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>Submitted At:</span>
                      </span>
                      <span className="font-mono text-slate-300">{tx.createdAt}</span>
                    </div>
                  </div>
                </div>

                {tx.note && (
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/70 text-xs">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold mb-0.5">
                      Transaction Note:
                    </span>
                    <p className="text-slate-300">{tx.note}</p>
                  </div>
                )}
              </div>

              {/* ADMIN DECISION BUTTONS */}
              {isAdmin && tx.status === 'pending' ? (
                <div className="pt-4 border-t border-slate-800 space-y-2 mt-4">
                  <span className="text-[11px] text-slate-400 font-semibold block mb-1">
                    Treasury Approval Actions:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onReject?.(tx.id);
                        onClose();
                      }}
                      className="py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Reject Slip
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onApprove?.(tx.id);
                        onClose();
                      }}
                      className="py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Credit</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-800 mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Close Viewer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
