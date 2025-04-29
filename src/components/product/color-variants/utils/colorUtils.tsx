
export const getStockLevelInfo = (stock: number) => {
  if (stock === 0) {
    return {
      label: "Out of Stock",
      badgeColor: "bg-red-100 text-red-800",
      progressColor: "bg-gray-400",
      icon: <XCircleIcon />,
      urgency: "high",
      message: "Sold out! But we'll restock soon – stay tuned!"
    };
  } else if (stock >= 1 && stock <= 25) {
    return {
      label: "Critical",
      badgeColor: "bg-red-100 text-red-800",
      progressColor: "bg-red-500",
      icon: <AlertCircleIcon />,
      urgency: "high",
      message: "Almost sold out – just a few left!"
    };
  } else if (stock >= 26 && stock <= 64) {
    return {
      label: "Low Stock",
      badgeColor: "bg-orange-100 text-orange-800",
      progressColor: "bg-orange-500",
      icon: <AlertTriangleIcon />,
      urgency: "medium",
      message: "Stock is running low! Don't miss your chance."
    };
  } else if (stock >= 65 && stock <= 128) {
    return {
      label: "Medium Stock",
      badgeColor: "bg-yellow-100 text-yellow-800",
      progressColor: "bg-yellow-500",
      icon: <CheckCircleIcon />,
      urgency: "low",
      message: "Going quick – 50% of our stock is already gone!"
    };
  } else if (stock >= 129 && stock <= 200) {
    return {
      label: "High Stock",
      badgeColor: "bg-green-100 text-green-800",
      progressColor: "bg-green-500",
      icon: <CheckCircleIcon />,
      urgency: "none",
      message: "Still available, but demand is picking up. Secure yours today!"
    };
  } else {
    return {
      label: "Overstocked",
      badgeColor: "bg-blue-100 text-blue-800",
      progressColor: "bg-blue-500",
      icon: <CheckCircleIcon />,
      urgency: "none",
      message: "Plenty available – get the best pick while stock is high!"
    };
  }
};

export const getColorHex = (name: string) => {
  const colorMap: {[key: string]: string} = {
    "Black": "#000000",
    "White": "#ffffff",
    "Jet Black": "#111111",
    "Navy Blue": "#000080",
    "Red": "#FF0000",
    "Forest Green": "#228B22"
  };
  return colorMap[name] || "#CCCCCC";
};

// Icon components for better code organization
export const XCircleIcon = () => <XCircle className="w-4 h-4 text-red-500" />;
export const AlertCircleIcon = () => <AlertCircle className="w-4 h-4 text-red-500" />;
export const AlertTriangleIcon = () => <AlertTriangle className="w-4 h-4 text-orange-500" />;
export const CheckCircleIcon = () => <CheckCircle className="w-4 h-4 text-green-500" />;
