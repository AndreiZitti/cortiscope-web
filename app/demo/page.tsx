'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type AppState = 'upload' | 'processing' | 'analysis';
type ViewType = 'segmentation' | '3d' | 'uncertainty';

interface SampleMRI {
  id: string;
  thumbnail: string;
  name: string;
}

const sampleMRIs: SampleMRI[] = [
  {
    id: 'sample2',
    thumbnail: '/demo/RAW2.png',
    name: 'Brain Tumor Sample #2'
  }
];

export default function DemoPage() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [currentView, setCurrentView] = useState<ViewType>('segmentation');
  const [showModal, setShowModal] = useState(false);
  const [selectedSample, setSelectedSample] = useState<SampleMRI | null>(null);
  const [showGif, setShowGif] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSampleSelect = (sample: SampleMRI) => {
    setSelectedSample(sample);
    setShowModal(false);
    setAppState('processing');

    // Auto-transition to analysis after 2 seconds
    setTimeout(() => {
      setAppState('analysis');
    }, 2000);
  };

  const handleUploadClick = () => {
    setShowModal(true);
  };

  const handleViewChange = (view: ViewType) => {
    if (view === '3d') {
      setShowGif(true);
      // Wait for GIF to complete (approximately 5-6 seconds based on animation)
      setTimeout(() => setShowGif(false), 6000);
    }
    setCurrentView(view);
  };

  // Upload State
  if (appState === 'upload') {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <motion.button
            onClick={handleUploadClick}
            className="px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-xl shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload MRI Scan
          </motion.button>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Select Sample MRI</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sampleMRIs.map((sample) => (
                    <motion.div
                      key={sample.id}
                      className="border-2 border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-blue-500 transition-all"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSampleSelect(sample)}
                    >
                      <div className="relative w-full h-48 bg-gray-100">
                        <Image
                          src={sample.thumbnail}
                          alt={sample.name}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                      <div className="p-4 bg-white">
                        <p className="text-sm font-medium text-gray-800">{sample.name}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Processing State
  if (appState === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 mx-auto mb-6"
          >
            <Image
              src="/CortiscopeLogo.png"
              alt="Processing"
              width={96}
              height={96}
            />
          </motion.div>
          <p className="text-2xl font-semibold text-gray-700">Processing...</p>
        </div>
      </div>
    );
  }

  // Analysis State
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20 pb-4 overflow-hidden">
      <div className="container mx-auto px-6 h-full flex flex-col">
        {/* Clinical Metadata Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4 flex-shrink-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Patient ID</p>
              <p className="text-lg font-semibold text-gray-800">PT-2847-MRI</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Scan Date</p>
              <p className="text-lg font-semibold text-gray-800">2024-10-15</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Modality</p>
              <p className="text-lg font-semibold text-gray-800">T1-Weighted MRI</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Tumor Volume</p>
              <p className="text-lg font-semibold text-blue-600">47.3 cm³</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Analysis completed: {new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 flex-1 min-h-0">

          {/* Left Panel */}
          <div className="flex flex-col gap-4 min-h-0">
            {/* View Selector Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-4 flex-shrink-0">
              <h3 className="text-base font-semibold text-gray-800 mb-3">Analysis Views</h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleViewChange('segmentation')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all text-left flex items-center gap-3 text-sm ${
                    currentView === 'segmentation'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                  <span>1. Tumor Segmentation</span>
                </button>
                <button
                  onClick={() => handleViewChange('3d')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all text-left flex items-center gap-3 text-sm ${
                    currentView === '3d'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>2. 3D Volumetric Analysis</span>
                </button>
                <button
                  onClick={() => handleViewChange('uncertainty')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all text-left flex items-center gap-3 text-sm ${
                    currentView === 'uncertainty'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>3. Uncertainty Map</span>
                </button>
              </div>
            </div>

            {/* Technical Info Panel */}
            <div className="bg-white rounded-xl shadow-lg p-4 flex-1 overflow-y-auto min-h-0">
              <h3 className="text-base font-semibold text-gray-800 mb-3">Technical Information</h3>

              {currentView === 'segmentation' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tumor Type</p>
                    <p className="text-xl font-bold text-blue-600">Glioblastoma</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Confidence</p>
                    <p className="text-xl font-bold text-green-600">94.7%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Affected Regions</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="text-sm">Enhancing Tumor Core</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="text-sm">Peritumoral Edema</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <span className="text-sm">Necrotic Core</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {currentView === '3d' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tumor Volume</p>
                    <p className="text-xl font-bold text-blue-600">42.3 cm³</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Dimensions</p>
                    <p className="text-sm font-mono">45mm × 38mm × 32mm</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Primary Growth Axis</p>
                    <p className="text-sm">Anterior-Posterior</p>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-700">
                      💡 Use mouse to rotate the 3D model. Scroll to zoom.
                    </p>
                  </div>
                </div>
              )}

              {currentView === 'uncertainty' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Uncertainty Legend</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-500 rounded"></div>
                        <span className="text-sm">Low (0-30%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                        <span className="text-sm">Medium (30-60%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-500 rounded"></div>
                        <span className="text-sm">High (60-100%)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Average Uncertainty</p>
                    <p className="text-xl font-bold text-yellow-600">18.2%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">High-Risk Areas</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Tumor boundary (posterior)</li>
                      <li>• Edema transition zone</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Content Area */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden relative min-h-0">
            <AnimatePresence mode="wait">
              {currentView === 'segmentation' && (
                <motion.div
                  key="segmentation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 p-8 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    {/* Base MRI */}
                    <Image
                      src="/demo/RAW2.png"
                      alt="MRI Scan"
                      fill
                      className="object-contain"
                    />
                    {/* Tumor Mask Overlay */}
                    <Image
                      src="/demo/tumor_mask2.png"
                      alt="Tumor Segmentation"
                      fill
                      className="object-contain"
                      style={{ mixBlendMode: 'multiply', opacity: 0.7 }}
                    />

                    {/* Slice Position Indicator - Top Left */}
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-mono">
                      Slice 87/155
                    </div>

                    {/* Anatomical Orientation Markers */}
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                      A
                    </div>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                      L
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                      R
                    </div>
                    <div className="absolute left-1/2 bottom-4 -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                      P
                    </div>

                    {/* Zoom Level Indicator - Top Right */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-xs">
                      Zoom: 100%
                    </div>
                  </div>
                </motion.div>
              )}

              {currentView === '3d' && (
                <motion.div
                  key="3d"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  {showGif ? (
                    <div className="absolute inset-0 p-8 flex items-center justify-center bg-black">
                      <Image
                        src="/demo/HeadbuildGIF2.gif"
                        alt="Building 3D Model"
                        width={600}
                        height={600}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <iframe
                      ref={iframeRef}
                      src="/brats_visualisations/brain_skull_tumor_angled.html"
                      className="w-full h-full"
                      style={{ border: 'none' }}
                      title="3D Tumor Visualization"
                    />
                  )}
                </motion.div>
              )}

              {currentView === 'uncertainty' && (
                <motion.div
                  key="uncertainty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 p-8 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/demo/UncertainMap2.png"
                      alt="Uncertainty Heatmap"
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
