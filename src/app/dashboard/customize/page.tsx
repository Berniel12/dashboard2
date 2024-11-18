'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ArrowRight, Plus } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  logo: string;
  color: string;
  category: 'government' | 'shipping' | 'compliance' | 'communication' | 'financial' | 'general';
  country?: string;
}

function adjustColor(color: string, amount: number): string {
  // Remove the '#' if present
  const hex = color.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Adjust each component
  const adjustR = Math.max(0, Math.min(255, r + amount));
  const adjustG = Math.max(0, Math.min(255, g + amount));
  const adjustB = Math.max(0, Math.min(255, b + amount));
  
  // Convert back to hex
  const newHex = ((adjustR << 16) + (adjustG << 8) + adjustB).toString(16).padStart(6, '0');
  return `#${newHex}`;
}

function getLogoPlaceholder(name: string, color: string): string {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';

  // Draw background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 200, 200);

  // Add a subtle gradient overlay
  const gradient = ctx.createLinearGradient(0, 0, 200, 200);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 200, 200);

  // Draw text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 100px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.charAt(0).toUpperCase(), 100, 100);

  return canvas.toDataURL('image/png');
}

function IntegrationLogo({ integration }: { integration: Integration }) {
  const [logoError, setLogoError] = useState(false);
  const [placeholderLogo, setPlaceholderLogo] = useState<string>('');

  useEffect(() => {
    if (logoError || !integration.logo.startsWith('/')) {
      setPlaceholderLogo(getLogoPlaceholder(integration.name, integration.color));
    }
  }, [logoError, integration.name, integration.color, integration.logo]);

  return (
    <img
      src={logoError ? placeholderLogo : integration.logo}
      alt={`${integration.name} logo`}
      onError={() => setLogoError(true)}
      className="w-full h-full object-contain drop-shadow-sm"
    />
  );
}

const integrations: Integration[] = [
  // Government Integrations
  {
    id: 'shaar-olami',
    name: 'Shaar Olami',
    logo: '/images/saar_olami_2logo-1024x1010.png',
    color: '#1d4ed8',
    category: 'government',
    country: 'Israel'
  },
  {
    id: 'maslul',
    name: 'MASLUL',
    logo: '/images/Emblem_of_Israel.svg.png',
    color: '#0369a1',
    category: 'government',
    country: 'Israel'
  },
  {
    id: 'customs-uk',
    name: 'CHIEF',
    logo: '/images/chief.png',
    color: '#4338ca',
    category: 'government',
    country: 'UK'
  },
  {
    id: 'eu-customs',
    name: 'EU Import Service',
    logo: '/images/EU.png',
    color: '#0051ba',
    category: 'government',
    country: 'EU'
  },
  {
    id: 'us-customs',
    name: 'ACE',
    logo: '/images/ACE.png',
    color: '#00205b',
    category: 'government',
    country: 'USA'
  },
  {
    id: 'au-customs',
    name: 'ICS',
    logo: '/images/Australia.png',
    color: '#00843D',
    category: 'government',
    country: 'Australia'
  },
  // Shipping Companies
  {
    id: 'zim',
    name: 'ZIM',
    logo: '/images/zim.png',
    color: '#0891b2',
    category: 'shipping'
  },
  {
    id: 'maersk',
    name: 'Maersk',
    logo: '/images/maersk.png',
    color: '#0284c7',
    category: 'shipping'
  },
  {
    id: 'fedex',
    name: 'FedEx',
    logo: '/images/fedex.png',
    color: '#7c3aed',
    category: 'shipping'
  },
  {
    id: 'msc',
    name: 'MSC',
    logo: '/images/msc.png',
    color: '#1e40af',
    category: 'shipping'
  },
  {
    id: 'cma-cgm',
    name: 'CMA CGM',
    logo: '/images/cmacgm.png',
    color: '#be185d',
    category: 'shipping'
  },
  {
    id: 'hapag-lloyd',
    name: 'Hapag-Lloyd',
    logo: '/images/hapag-lloyd.png',
    color: '#dc2626',
    category: 'shipping'
  },
  {
    id: 'evergreen',
    name: 'Evergreen Marine',
    logo: '/images/evergreen.png',
    color: '#15803d',
    category: 'shipping'
  },
  {
    id: 'cosco',
    name: 'COSCO Shipping',
    logo: '/images/cosco.png',
    color: '#b91c1c',
    category: 'shipping'
  },
  {
    id: 'hmm',
    name: 'HMM',
    logo: '/images/hmm.png',
    color: '#0369a1',
    category: 'shipping'
  },
  {
    id: 'ups',
    name: 'UPS',
    logo: '/images/ups.png',
    color: '#854d0e',
    category: 'shipping'
  },
  // Compliance Integrations
  {
    id: 'trade-guardian',
    name: 'Trade Guardian',
    logo: '/images/compliance.png',
    color: '#0f766e',
    category: 'compliance'
  },
  {
    id: 'restricted-party',
    name: 'Restricted Party Screening',
    logo: '/images/compliance.png',
    color: '#0d9488',
    category: 'compliance'
  },
  {
    id: 'sanctions-check',
    name: 'Sanctions Check',
    logo: '/images/compliance.png',
    color: '#0891b2',
    category: 'compliance'
  },
  {
    id: 'export-control',
    name: 'Export Control',
    logo: '/images/compliance.png',
    color: '#0369a1',
    category: 'compliance'
  },
  // Communication Integrations
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    logo: '/images/whatsapp.png',
    color: '#25D366',
    category: 'communication'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    logo: '/images/telegram.png',
    color: '#0088cc',
    category: 'communication'
  },
  {
    id: 'slack',
    name: 'Slack',
    logo: '/images/slack.png',
    color: '#4A154B',
    category: 'communication'
  },
  {
    id: 'email',
    name: 'Email',
    logo: '/images/email.png',
    color: '#EA4335',
    category: 'communication'
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    logo: '/images/teams.png',
    color: '#6264A7',
    category: 'communication'
  },
  // Financial Integrations
  {
    id: 'payoneer',
    name: 'Payoneer',
    logo: '/images/payoneer.png',
    color: '#FF4B3E',
    category: 'financial'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    logo: '/images/paypal.png',
    color: '#003087',
    category: 'financial'
  },
  {
    id: 'wise',
    name: 'Wise',
    logo: '/images/wise.png',
    color: '#00B9FF',
    category: 'financial'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    logo: '/images/stripe.png',
    color: '#635BFF',
    category: 'financial'
  },
  {
    id: 'bank-api',
    name: 'Bank API',
    logo: '/images/bank.png',
    color: '#1a365d',
    category: 'financial'
  },
  // General Functions
  {
    id: 'document-processing',
    name: 'Document Processing',
    logo: '/logos/doc-processing.png',
    color: '#059669',
    category: 'general'
  },
  {
    id: 'hs-classification',
    name: 'HS Classification',
    logo: '/logos/hs-code.png',
    color: '#0d9488',
    category: 'general'
  },
  {
    id: 'compliance',
    name: 'Compliance Check',
    logo: '/logos/compliance.png',
    color: '#0369a1',
    category: 'general'
  }
];

export default function CustomizePage() {
  const [selectedIntegrations, setSelectedIntegrations] = useState<Integration[]>([]);
  const [activeCategory, setActiveCategory] = useState<'government' | 'shipping' | 'compliance' | 'communication' | 'financial' | 'general'>('government');

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId.startsWith('workflow-') && destination.droppableId.startsWith('workflow-')) {
      const sourceCategory = source.droppableId.split('-')[1] as 'government' | 'shipping' | 'general';
      const destCategory = destination.droppableId.split('-')[1] as 'government' | 'shipping' | 'general';
      
      const items = Array.from(selectedIntegrations);
      const [reorderedItem] = items.splice(source.index, 1);
      
      if (destCategory === 'government') {
        const existingGovIntegrations = items.filter(i => i.category === 'government');
        if (existingGovIntegrations.some(i => i.country !== reorderedItem.country)) {
          return;
        }
      }
      
      if (sourceCategory !== destCategory) {
        reorderedItem.category = destCategory;
      }
      
      items.splice(destination.index, 0, reorderedItem);
      setSelectedIntegrations(items);
      return;
    }

    if (source.droppableId === 'available' && destination.droppableId.startsWith('workflow-')) {
      const destCategory = destination.droppableId.split('-')[1] as 'government' | 'shipping' | 'general';
      const availableIntegrations = integrations.filter(i => i.category === activeCategory);
      const draggedIntegration = availableIntegrations[source.index];
      
      if (draggedIntegration.category !== destCategory) return;
      
      const baseId = draggedIntegration.id.split('-')[0];
      const isDuplicate = selectedIntegrations.some(i => i.id.startsWith(baseId));
      if (isDuplicate) return;
      
      if (destCategory === 'government') {
        const existingGovIntegrations = selectedIntegrations.filter(i => i.category === 'government');
        if (existingGovIntegrations.some(i => i.country !== draggedIntegration.country)) {
          return;
        }
      }
      
      const newIntegration = {
        ...draggedIntegration,
        id: `${draggedIntegration.id}-${Date.now()}`
      };
      
      const newItems = Array.from(selectedIntegrations);
      newItems.splice(destination.index, 0, newIntegration);
      setSelectedIntegrations(newItems);
    }
  };

  const handleRemoveIntegration = (integrationId: string) => {
    setSelectedIntegrations(prev => prev.filter(i => i.id !== integrationId));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-900">Customize Your Workflow</h1>
        <p className="text-sm text-gray-500">Drag and drop integrations to build your custom workflow</p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-12 gap-6">
          {/* Available Integrations */}
          <div className="col-span-4 bg-white rounded-lg shadow-sm p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Available Integrations</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {(['government', 'shipping', 'compliance', 'communication', 'financial', 'general'] as const).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeCategory === category
                        ? 'bg-blue-100/80 text-blue-700 shadow-sm ring-1 ring-blue-200'
                        : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <Droppable droppableId="available" isDropDisabled={true}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 gap-3"
                >
                  {integrations
                    .filter(integration => integration.category === activeCategory)
                    .map((integration, index) => (
                      <Draggable
                        key={integration.id}
                        draggableId={integration.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="relative group"
                          >
                            <div
                              className="p-4 rounded-xl border hover:border-solid transition-all cursor-move bg-white hover:shadow-lg hover:-translate-y-1 duration-200"
                              style={{ borderColor: integration.color, borderWidth: '1.5px', borderStyle: 'dashed' }}
                            >
                              <div className="w-16 h-16 mx-auto mb-3 rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-3">
                                <IntegrationLogo integration={integration} />
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-sm text-gray-900 mb-0.5">
                                  {integration.name}
                                </div>
                                {integration.country && (
                                  <div className="text-xs text-gray-500 bg-gray-50 rounded-full px-2 py-0.5 inline-block">
                                    {integration.country}
                                  </div>
                                )}
                              </div>
                              <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                <Plus className="w-6 h-6" style={{ color: integration.color }} />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Workflow Builder */}
          <div className="col-span-8 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Workflow</h2>
            
            <div className="space-y-6">
              {/* Government Integrations Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Government Integrations</h3>
                <Droppable droppableId="workflow-government" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-[140px] flex items-center p-5 rounded-xl transition-all duration-200 ${
                        snapshot.isDraggingOver 
                          ? 'bg-blue-50/70 border-2 border-dashed border-blue-200 shadow-sm' 
                          : 'border-2 border-dashed border-gray-200/70 hover:border-gray-300/70'
                      }`}
                    >
                      {selectedIntegrations.filter(i => i.category === 'government').length === 0 ? (
                        <div className="w-full text-center text-gray-500 text-sm">
                          Drag government integrations here
                        </div>
                      ) : (
                        <div className="flex items-center flex-wrap gap-4">
                          {selectedIntegrations
                            .filter(i => i.category === 'government')
                            .map((integration, index) => (
                              <Draggable 
                                key={integration.id}
                                draggableId={integration.id} 
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`flex-shrink-0 transform transition-transform relative group ${
                                      snapshot.isDragging ? 'scale-105' : ''
                                    }`}
                                  >
                                    <div
                                      className="p-4 rounded-xl shadow-lg cursor-move relative overflow-hidden backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02]"
                                      style={{ 
                                        backgroundColor: adjustColor(integration.color, 20),
                                        background: `linear-gradient(135deg, ${adjustColor(integration.color, 40)} 0%, ${integration.color} 100%)`,
                                      }}
                                    >
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRemoveIntegration(integration.id);
                                        }}
                                        className="absolute -top-1 -right-1 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500 hover:text-white shadow-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 z-10"
                                        aria-label="Remove integration"
                                      >
                                        <svg 
                                          xmlns="http://www.w3.org/2000/svg" 
                                          className="h-4 w-4" 
                                          viewBox="0 0 20 20" 
                                          fill="currentColor"
                                        >
                                          <path 
                                            fillRule="evenodd" 
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                                            clipRule="evenodd" 
                                          />
                                        </svg>
                                      </button>
                                      <div className="w-20 h-20 bg-white/95 rounded-lg flex items-center justify-center mb-3 mx-auto p-2.5 shadow-sm ring-1 ring-white/20">
                                        <IntegrationLogo integration={integration} />
                                      </div>
                                      <div className="text-center text-white relative z-[1] space-y-1">
                                        <div className="font-semibold text-base tracking-wide">
                                          {integration.name}
                                        </div>
                                        {integration.country && (
                                          <div className="text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-0.5 inline-block font-light">
                                            {integration.country}
                                          </div>
                                        )}
                                      </div>
                                      <div 
                                        className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30 opacity-80"
                                        aria-hidden="true"
                                      />
                                      <div 
                                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] opacity-70"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Shipping Companies Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Shipping Companies</h3>
                <Droppable droppableId="workflow-shipping" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-[140px] flex items-center p-5 rounded-xl transition-all duration-200 ${
                        snapshot.isDraggingOver 
                          ? 'bg-blue-50/70 border-2 border-dashed border-blue-200 shadow-sm' 
                          : 'border-2 border-dashed border-gray-200/70 hover:border-gray-300/70'
                      }`}
                    >
                      {selectedIntegrations.filter(i => i.category === 'shipping').length === 0 ? (
                        <div className="w-full text-center text-gray-500 text-sm">
                          Drag shipping companies here
                        </div>
                      ) : (
                        <div className="flex items-center flex-wrap gap-4">
                          {selectedIntegrations
                            .filter(i => i.category === 'shipping')
                            .map((integration, index) => (
                              <Draggable 
                                key={integration.id}
                                draggableId={integration.id} 
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`flex-shrink-0 transform transition-transform relative group ${
                                      snapshot.isDragging ? 'scale-105' : ''
                                    }`}
                                  >
                                    <div
                                      className="p-4 rounded-xl shadow-lg cursor-move relative overflow-hidden backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02]"
                                      style={{ 
                                        backgroundColor: adjustColor(integration.color, 20),
                                        background: `linear-gradient(135deg, ${adjustColor(integration.color, 40)} 0%, ${integration.color} 100%)`,
                                      }}
                                    >
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRemoveIntegration(integration.id);
                                        }}
                                        className="absolute -top-1 -right-1 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500 hover:text-white shadow-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 z-10"
                                        aria-label="Remove integration"
                                      >
                                        <svg 
                                          xmlns="http://www.w3.org/2000/svg" 
                                          className="h-4 w-4" 
                                          viewBox="0 0 20 20" 
                                          fill="currentColor"
                                        >
                                          <path 
                                            fillRule="evenodd" 
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                                            clipRule="evenodd" 
                                          />
                                        </svg>
                                      </button>
                                      <div className="w-20 h-20 bg-white/95 rounded-lg flex items-center justify-center mb-3 mx-auto p-2.5 shadow-sm ring-1 ring-white/20">
                                        <IntegrationLogo integration={integration} />
                                      </div>
                                      <div className="text-center text-white relative z-[1] space-y-1">
                                        <div className="font-semibold text-base tracking-wide">
                                          {integration.name}
                                        </div>
                                        {integration.country && (
                                          <div className="text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-0.5 inline-block font-light">
                                            {integration.country}
                                          </div>
                                        )}
                                      </div>
                                      <div 
                                        className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30 opacity-80"
                                        aria-hidden="true"
                                      />
                                      <div 
                                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] opacity-70"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Compliance Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Compliance Tools</h3>
                <Droppable droppableId="workflow-compliance" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-[140px] flex items-center p-5 rounded-xl transition-all duration-200 ${
                        snapshot.isDraggingOver 
                          ? 'bg-blue-50/70 border-2 border-dashed border-blue-200 shadow-sm' 
                          : 'border-2 border-dashed border-gray-200/70 hover:border-gray-300/70'
                      }`}
                    >
                      {selectedIntegrations.filter(i => i.category === 'compliance').length === 0 ? (
                        <div className="w-full text-center text-gray-500 text-sm">
                          Drag compliance tools here
                        </div>
                      ) : (
                        <div className="flex items-center flex-wrap gap-4">
                          {selectedIntegrations
                            .filter(i => i.category === 'compliance')
                            .map((integration, index) => (
                              <Draggable 
                                key={integration.id}
                                draggableId={integration.id} 
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`flex-shrink-0 transform transition-transform relative group ${
                                      snapshot.isDragging ? 'scale-105' : ''
                                    }`}
                                  >
                                    <div
                                      className="p-4 rounded-xl shadow-lg cursor-move relative overflow-hidden backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02]"
                                      style={{ 
                                        backgroundColor: adjustColor(integration.color, 20),
                                        background: `linear-gradient(135deg, ${adjustColor(integration.color, 40)} 0%, ${integration.color} 100%)`,
                                      }}
                                    >
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRemoveIntegration(integration.id);
                                        }}
                                        className="absolute -top-1 -right-1 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500 hover:text-white shadow-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 z-10"
                                        aria-label="Remove integration"
                                      >
                                        <svg 
                                          xmlns="http://www.w3.org/2000/svg" 
                                          className="h-4 w-4" 
                                          viewBox="0 0 20 20" 
                                          fill="currentColor"
                                        >
                                          <path 
                                            fillRule="evenodd" 
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                                            clipRule="evenodd" 
                                          />
                                        </svg>
                                      </button>
                                      <div className="w-20 h-20 bg-white/95 rounded-lg flex items-center justify-center mb-3 mx-auto p-2.5 shadow-sm ring-1 ring-white/20">
                                        <IntegrationLogo integration={integration} />
                                      </div>
                                      <div className="text-center text-white relative z-[1] space-y-1">
                                        <div className="font-semibold text-base tracking-wide">
                                          {integration.name}
                                        </div>
                                        {integration.country && (
                                          <div className="text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-0.5 inline-block font-light">
                                            {integration.country}
                                          </div>
                                        )}
                                      </div>
                                      <div 
                                        className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30 opacity-80"
                                        aria-hidden="true"
                                      />
                                      <div 
                                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] opacity-70"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Communication Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Communication Channels</h3>
                <Droppable droppableId="workflow-communication" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-[140px] flex items-center p-5 rounded-xl transition-all duration-200 ${
                        snapshot.isDraggingOver 
                          ? 'bg-blue-50/70 border-2 border-dashed border-blue-200 shadow-sm' 
                          : 'border-2 border-dashed border-gray-200/70 hover:border-gray-300/70'
                      }`}
                    >
                      {selectedIntegrations.filter(i => i.category === 'communication').length === 0 ? (
                        <div className="w-full text-center text-gray-500 text-sm">
                          Drag communication channels here
                        </div>
                      ) : (
                        <div className="flex items-center flex-wrap gap-4">
                          {selectedIntegrations
                            .filter(i => i.category === 'communication')
                            .map((integration, index) => (
                              <Draggable 
                                key={integration.id}
                                draggableId={integration.id} 
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`flex-shrink-0 transform transition-transform relative group ${
                                      snapshot.isDragging ? 'scale-105' : ''
                                    }`}
                                  >
                                    <div
                                      className="p-4 rounded-xl shadow-lg cursor-move relative overflow-hidden backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02]"
                                      style={{ 
                                        backgroundColor: adjustColor(integration.color, 20),
                                        background: `linear-gradient(135deg, ${adjustColor(integration.color, 40)} 0%, ${integration.color} 100%)`,
                                      }}
                                    >
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRemoveIntegration(integration.id);
                                        }}
                                        className="absolute -top-1 -right-1 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500 hover:text-white shadow-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 z-10"
                                        aria-label="Remove integration"
                                      >
                                        <svg 
                                          xmlns="http://www.w3.org/2000/svg" 
                                          className="h-4 w-4" 
                                          viewBox="0 0 20 20" 
                                          fill="currentColor"
                                        >
                                          <path 
                                            fillRule="evenodd" 
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                                            clipRule="evenodd" 
                                          />
                                        </svg>
                                      </button>
                                      <div className="w-20 h-20 bg-white/95 rounded-lg flex items-center justify-center mb-3 mx-auto p-2.5 shadow-sm ring-1 ring-white/20">
                                        <IntegrationLogo integration={integration} />
                                      </div>
                                      <div className="text-center text-white relative z-[1] space-y-1">
                                        <div className="font-semibold text-base tracking-wide">
                                          {integration.name}
                                        </div>
                                        {integration.country && (
                                          <div className="text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-0.5 inline-block font-light">
                                            {integration.country}
                                          </div>
                                        )}
                                      </div>
                                      <div 
                                        className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30 opacity-80"
                                        aria-hidden="true"
                                      />
                                      <div 
                                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] opacity-70"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Financial Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Financial Services</h3>
                <Droppable droppableId="workflow-financial" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-[140px] flex items-center p-5 rounded-xl transition-all duration-200 ${
                        snapshot.isDraggingOver 
                          ? 'bg-blue-50/70 border-2 border-dashed border-blue-200 shadow-sm' 
                          : 'border-2 border-dashed border-gray-200/70 hover:border-gray-300/70'
                      }`}
                    >
                      {selectedIntegrations.filter(i => i.category === 'financial').length === 0 ? (
                        <div className="w-full text-center text-gray-500 text-sm">
                          Drag financial services here
                        </div>
                      ) : (
                        <div className="flex items-center flex-wrap gap-4">
                          {selectedIntegrations
                            .filter(i => i.category === 'financial')
                            .map((integration, index) => (
                              <Draggable 
                                key={integration.id}
                                draggableId={integration.id} 
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`flex-shrink-0 transform transition-transform relative group ${
                                      snapshot.isDragging ? 'scale-105' : ''
                                    }`}
                                  >
                                    <div
                                      className="p-4 rounded-xl shadow-lg cursor-move relative overflow-hidden backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02]"
                                      style={{ 
                                        backgroundColor: adjustColor(integration.color, 20),
                                        background: `linear-gradient(135deg, ${adjustColor(integration.color, 40)} 0%, ${integration.color} 100%)`,
                                      }}
                                    >
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRemoveIntegration(integration.id);
                                        }}
                                        className="absolute -top-1 -right-1 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500 hover:text-white shadow-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 z-10"
                                        aria-label="Remove integration"
                                      >
                                        <svg 
                                          xmlns="http://www.w3.org/2000/svg" 
                                          className="h-4 w-4" 
                                          viewBox="0 0 20 20" 
                                          fill="currentColor"
                                        >
                                          <path 
                                            fillRule="evenodd" 
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                                            clipRule="evenodd" 
                                          />
                                        </svg>
                                      </button>
                                      <div className="w-20 h-20 bg-white/95 rounded-lg flex items-center justify-center mb-3 mx-auto p-2.5 shadow-sm ring-1 ring-white/20">
                                        <IntegrationLogo integration={integration} />
                                      </div>
                                      <div className="text-center text-white relative z-[1] space-y-1">
                                        <div className="font-semibold text-base tracking-wide">
                                          {integration.name}
                                        </div>
                                        {integration.country && (
                                          <div className="text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-0.5 inline-block font-light">
                                            {integration.country}
                                          </div>
                                        )}
                                      </div>
                                      <div 
                                        className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30 opacity-80"
                                        aria-hidden="true"
                                      />
                                      <div 
                                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] opacity-70"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* General Functions Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">General Functions</h3>
                <Droppable droppableId="workflow-general" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-[140px] flex items-center p-5 rounded-xl transition-all duration-200 ${
                        snapshot.isDraggingOver 
                          ? 'bg-blue-50/70 border-2 border-dashed border-blue-200 shadow-sm' 
                          : 'border-2 border-dashed border-gray-200/70 hover:border-gray-300/70'
                      }`}
                    >
                      {selectedIntegrations.filter(i => i.category === 'general').length === 0 ? (
                        <div className="w-full text-center text-gray-500 text-sm">
                          Drag general functions here
                        </div>
                      ) : (
                        <div className="flex items-center flex-wrap gap-4">
                          {selectedIntegrations
                            .filter(i => i.category === 'general')
                            .map((integration, index) => (
                              <Draggable 
                                key={integration.id}
                                draggableId={integration.id} 
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`flex-shrink-0 transform transition-transform relative group ${
                                      snapshot.isDragging ? 'scale-105' : ''
                                    }`}
                                  >
                                    <div
                                      className="p-4 rounded-xl shadow-lg cursor-move relative overflow-hidden backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02]"
                                      style={{ 
                                        backgroundColor: adjustColor(integration.color, 20),
                                        background: `linear-gradient(135deg, ${adjustColor(integration.color, 40)} 0%, ${integration.color} 100%)`,
                                      }}
                                    >
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRemoveIntegration(integration.id);
                                        }}
                                        className="absolute -top-1 -right-1 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500 hover:text-white shadow-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 z-10"
                                        aria-label="Remove integration"
                                      >
                                        <svg 
                                          xmlns="http://www.w3.org/2000/svg" 
                                          className="h-4 w-4" 
                                          viewBox="0 0 20 20" 
                                          fill="currentColor"
                                        >
                                          <path 
                                            fillRule="evenodd" 
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                                            clipRule="evenodd" 
                                          />
                                        </svg>
                                      </button>
                                      <div className="w-20 h-20 bg-white/95 rounded-lg flex items-center justify-center mb-3 mx-auto p-2.5 shadow-sm ring-1 ring-white/20">
                                        <IntegrationLogo integration={integration} />
                                      </div>
                                      <div className="text-center text-white relative z-[1] space-y-1">
                                        <div className="font-semibold text-base tracking-wide">
                                          {integration.name}
                                        </div>
                                        {integration.country && (
                                          <div className="text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-0.5 inline-block font-light">
                                            {integration.country}
                                          </div>
                                        )}
                                      </div>
                                      <div 
                                        className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30 opacity-80"
                                        aria-hidden="true"
                                      />
                                      <div 
                                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] opacity-70"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
} 