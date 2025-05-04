export const ProductCard = ({ product }) => {
  const mainImage = product.product_images?.[0]?.src || "https://placehold.co/300x300?text=No+Image";
  const discountPercentage = product.discount_price && Math.round(((product.price - product.discount_price) / product.price) * 100);

  return (
    <Card className="overflow-hidden group border h-full">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative bg-gray-100 aspect-square overflow-hidden">
          <img 
            src={mainImage} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {discountPercentage && (
            <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
              -{discountPercentage}%
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-1 right-1 bg-white/90 text-gray-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-3.5 w-3.5" />
          </Button>
        </div>
      </Link>
      <CardContent className="p-2 space-y-1">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-xs font-medium leading-tight line-clamp-2">{product.name}</h3>
          <div className="flex items-center text-amber-400 text-[10px] gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < 4 ? "fill-amber-400" : "stroke-amber-400/50"}`} />
            ))}
            <span className="text-gray-500 ml-1">(42)</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            {product.discount_price ? (
              <>
                <span className="text-red-500 font-semibold text-sm">${product.discount_price.toFixed(2)}</span>
                <span className="text-gray-400 text-[10px] line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-sm font-semibold">${product.price.toFixed(2)}</span>
            )}
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">Free Shipping</p>
        </Link>
      </CardContent>
      <CardFooter className="p-2 pt-0">
        <Button size="sm" variant="outline" className="w-full h-7 text-[11px] gap-1">
          <ShoppingCart className="h-3.5 w-3.5" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
};