'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  DragDropContext, 
  Droppable, 
  Draggable 
} from '@hello-pangea/dnd';
import { 
  LayoutGrid, 
  GripVertical, 
  Eye, 
  EyeOff,
  ChevronDown,
  Save,
  RotateCcw,
} from 'lucide-react';
import { useDashboard, DashboardWidget } from '@/contexts/DashboardContext';

export default function CustomizeDashboard() {
  const router = useRouter();
  const { widgets, updateWidgets, resetToDefault } = useDashboard();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    updateWidgets(updatedItems);
  };

  const toggleWidget = (id: string) => {
    const updatedWidgets = widgets.map(widget => 
      widget.id === id ? { ...widget, enabled: !widget.enabled } : widget
    );
    updateWidgets(updatedWidgets);
  };

  const handleSave = () => {
    router.push('/dashboard');
  };

  const handleReset = () => {
    resetToDefault();
  };

  const filteredWidgets = activeCategory === 'all' 
    ? widgets 
    : widgets.filter(widget => widget.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Customize Dashboard</h1>
            <p className="text-sm text-gray-500">
              Drag and drop widgets to reorder, toggle visibility to customize your dashboard
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <div className="flex items-center">
                <RotateCcw className="w-4 h-4 mr-1.5" />
                Reset to Default
              </div>
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <div className="flex items-center">
                <Save className="w-4 h-4 mr-1.5" />
                Save Changes
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2">
        {['all', 'metrics', 'charts', 'lists', 'activity'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Widgets List */}
      <div className="bg-white rounded-lg shadow-sm">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="widgets">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="divide-y"
              >
                {filteredWidgets.map((widget, index) => (
                  <Draggable 
                    key={widget.id} 
                    draggableId={widget.id} 
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div {...provided.dragHandleProps} className="mr-3">
                              <GripVertical className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                              <h3 className="font-medium">{widget.title}</h3>
                              <p className="text-sm text-gray-500">{widget.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              widget.size === 'small' ? 'bg-blue-100 text-blue-700' :
                              widget.size === 'medium' ? 'bg-purple-100 text-purple-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {widget.size}
                            </span>
                            <button
                              onClick={() => toggleWidget(widget.id)}
                              className={`p-2 rounded-lg ${
                                widget.enabled 
                                  ? 'text-blue-600 hover:bg-blue-50' 
                                  : 'text-gray-400 hover:bg-gray-50'
                              }`}
                            >
                              {widget.enabled ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                            </button>
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
        </DragDropContext>
      </div>
    </div>
  );
} 