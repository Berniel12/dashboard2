import { WCODeclaration } from '@/types/customs';

export const validateWCODeclaration = (declaration: WCODeclaration) => {
  const errors: string[] = [];

  // Validate required fields based on WCO standards
  if (!declaration.functionCode || !['1', '2', '3'].includes(declaration.functionCode)) {
    errors.push('Invalid function code');
  }

  if (!declaration.declarationType || !['IMZ', 'EXZ'].includes(declaration.declarationType)) {
    errors.push('Invalid declaration type');
  }

  // Validate parties based on WCO role codes
  const requiredParties = ['DEC', 'EXP', 'IMP'];
  requiredParties.forEach(roleCode => {
    const party = Object.values(declaration.parties).find(p => p.roleCode === roleCode);
    if (!party) {
      errors.push(`Missing required party: ${roleCode}`);
    }
  });

  // Validate commodity codes against WCO standards
  declaration.goodsShipment.commodity.forEach((commodity, index) => {
    if (!commodity.classification.id.match(/^[0-9]{6,10}$/)) {
      errors.push(`Invalid HS code format at commodity ${index + 1}`);
    }
  });

  return errors;
}; 