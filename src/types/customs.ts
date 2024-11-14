export interface HSCode {
  code: string;
  description: string;
  section: string;
  chapter: string;
  rate: string;
  notes?: string[];
}

export interface HSSection {
  id: string;
  title: string;
  chapters: string[];
}

export interface HSChapter {
  id: string;
  title: string;
  section: string;
}

export interface WCODeclaration {
  // WCO Standard Header Information
  functionCode: string; // 1 = Addition, 2 = Change, 3 = Deletion, etc.
  declarationType: string; // IMZ = Import, EXZ = Export, etc.
  goodsDeclarationIdentifier: string; // Unique ID
  issueDateTime: Date;
  
  // Party Information (Based on WCO Party Types)
  parties: {
    declarant: WCOParty; // Code: DEC
    exporter: WCOParty;  // Code: EXP
    importer: WCOParty;  // Code: IMP
    carrier: WCOParty;   // Code: CAR
    broker: WCOParty;    // Code: AGL
  };
  
  // Goods Information
  goodsShipment: {
    sequenceNumeric: number;
    destinationCountryCode: string; // ISO country code
    exportCountryCode: string;      // ISO country code
    ucr: string;                    // Unique Consignment Reference
    
    // Consignment Details
    consignment: {
      containerIndicator: boolean;
      arrivalTransportMeans: {
        identificationTypeCode: string;
        id: string;
        name: string;
        modeCode: string; // 1 = Maritime, 4 = Air, etc.
      };
      loadingLocation: {
        id: string;
        typeCode: string;
      };
    };
    
    // Commodity Details
    commodity: {
      description: string;
      classification: {
        id: string;          // HS Code
        identificationTypeCode: string;
        bindingTariffReference: string;
      };
      dangerousGoods?: {
        unDangerousGoodsCode: string;
        hazardCodeVersionNumber: string;
      };
    }[];
  };
  
  // Valuation Information
  customsValuation: {
    methodCode: string;      // 1 = Transaction value, 2 = Similar goods, etc.
    chargeDeduction: {
      chargeTypeCode: string;
      amount: number;
        currencyTypeCode: string;
    }[];
  };
}

interface WCOParty {
  id: string;
  roleCode: string;
  name: string;
  address: {
    line: string;
    cityName: string;
    countryCode: string;
    postcode: string;
  };
  communication: {
    typeCode: string;  // TE = Telephone, EM = Email, etc.
    id: string;
  }[];
} 