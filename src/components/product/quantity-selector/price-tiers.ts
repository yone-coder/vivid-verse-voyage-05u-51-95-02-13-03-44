
// Define price tiers and their thresholds
export const PRICE_TIERS = [
  { min: 1, max: 2, price: 10.00, discount: 0 },
  { min: 3, max: 5, price: 9.00, discount: 10 },
  { min: 6, max: 9, price: 8.50, discount: 15 },
  { min: 10, max: 49, price: 8.00, discount: 20 },
  { min: 50, max: 99, price: 7.50, discount: 25 },
  { min: 100, max: Infinity, price: 7.00, discount: 30 }
];

export const MAX_QUANTITY = 250; // Updated max quantity to 250

export const findActiveTier = (quantity: number) => {
  return PRICE_TIERS.find(tier => quantity >= tier.min && quantity <= tier.max) || PRICE_TIERS[0];
};

export const calculateSavings = (quantity: number, activeTier: typeof PRICE_TIERS[0]) => {
  if (activeTier.discount === 0) return 0;
  const regularPrice = PRICE_TIERS[0].price * quantity;
  const discountedPrice = activeTier.price * quantity;
  return (regularPrice - discountedPrice).toFixed(2);
};

export const getNextDiscountThreshold = (activeTier: typeof PRICE_TIERS[0]) => {
  const currentTierIndex = PRICE_TIERS.indexOf(activeTier);
  return currentTierIndex < PRICE_TIERS.length - 1 
    ? PRICE_TIERS[currentTierIndex + 1].min 
    : null;
};
