import { useContext, useEffect } from "react";
import { FilterContext } from "../Context/FilterContext";

export function useFilters() {
  const { filters, setFilters } = useContext(FilterContext);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const filterProducts = (cs_products) => {
    return cs_products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === "all" || product.category === filters.category)
      );
    });
  };

  return { filters, filterProducts, setFilters };
}
