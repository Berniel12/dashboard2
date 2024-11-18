import { WCODeclaration } from '@/types/customs';
import { WCO_REFERENCES } from '@/utils/wcoReferences';

// Define the valid transport mode codes
type TransportModeCode = keyof typeof WCO_REFERENCES.transportModes;

function calculateWCOValue(declaration: any): number {
  const baseValue = declaration.value || 0;
  const freight = declaration.freightCost || 0;
  const insurance = declaration.insuranceCost || 0;
  
  return baseValue + freight + insurance;
}

export function WCOAnalytics({ declarations }: { declarations: WCODeclaration[] }) {
  // Calculate metrics based on WCO standards
  const metrics = {
    byTransportMode: declarations.reduce((acc, dec) => {
      const modeCode = dec.goodsShipment.consignment.arrivalTransportMeans.modeCode as TransportModeCode;
      acc[modeCode] = (acc[modeCode] || 0) + 1;
      return acc;
    }, {} as Record<TransportModeCode, number>),
    
    byDeclarationType: declarations.reduce((acc, dec) => {
      acc[dec.declarationType] = (acc[dec.declarationType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    
    totalValue: declarations.reduce((acc, dec) => {
      return acc + calculateWCOValue(dec);
    }, 0),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Transport Mode Distribution */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Transport Modes</h3>
        {Object.entries(metrics.byTransportMode).map(([code, count]) => (
          <div key={code} className="flex justify-between items-center mb-2">
            <span>{WCO_REFERENCES.transportModes[code as TransportModeCode]}</span>
            <span className="font-semibold">{count}</span>
          </div>
        ))}
      </div>

      {/* Declaration Types */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Declaration Types</h3>
        {Object.entries(metrics.byDeclarationType).map(([type, count]) => (
          <div key={type} className="flex justify-between items-center mb-2">
            <span>{type}</span>
            <span className="font-semibold">{count}</span>
          </div>
        ))}
      </div>

      {/* Total Value */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Total Value</h3>
        <div className="text-2xl font-bold">
          ${metrics.totalValue.toLocaleString()}
        </div>
      </div>
    </div>
  );
} 