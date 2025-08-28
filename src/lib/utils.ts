import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function calculateConservationImpact(orderTotal: number) {
  const conservationDonation = orderTotal * 0.1
  const bambooReforestation = conservationDonation * 0.5
  const pandaConservation = conservationDonation * 0.5
  
  return {
    totalDonation: conservationDonation,
    bambooReforestation,
    pandaConservation,
  }
}

export function calculateTreesPlanted(productType: 'floss' | 'toothbrush' | 'toothpaste', quantity: number): number {
  // Bamboo floss plants 3 trees per unit, toothbrush supports 1 tree per unit, toothpaste supports 2 trees per unit
  const treesPerUnit = productType === 'floss' ? 3 : productType === 'toothpaste' ? 2 : 1
  return treesPerUnit * quantity
}

export function calculateMicroplasticsEliminated(products: Array<{type: 'floss' | 'toothbrush', quantity: number}>): number {
  // Estimated grams of microplastics eliminated per year per product
  const microplasticsPerYear = {
    floss: 2.5, // grams per year from floss usage
    toothbrush: 1.2, // grams per year from toothbrush usage
  }
  
  return products.reduce((total, product) => {
    return total + (microplasticsPerYear[product.type] * product.quantity)
  }, 0)
}