
import { useContext } from "react";
import { FiltersContext } from "../contexts/filterContext"

export function useFilters(){
    const {filters, setFilters, categorias, setCategorias} = useContext(FiltersContext);   

     function updateMinPrice(minPrice: number) {
        setFilters((prev) => ({
            ...prev,
            ...{minPrice}
        }))
    }
     function updateCategoryFilter(category: string) {
        setFilters((prev) => ({
            ...prev,
            ...{category}
        }));
    }


return {filters, updateMinPrice, updateCategoryFilter, categorias, setCategorias}
};