import { createContext, useState, ReactNode } from 'react'

// Definir el tipo para el contexto
interface FiltersContextType {
  filters: {
    category: string;
    minPrice: number;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    category: string;
    minPrice: number;
  }>>;
  categorias: string[];
  setCategorias: React.Dispatch<React.SetStateAction<string[]>>;
}

// Proveer un valor predeterminado
const defaultFiltersContext: FiltersContextType = {
  filters: {
    category: "all",
    minPrice: 0
  },
  setFilters: () => {},
  categorias: [],
  setCategorias: () => {}
}

// Este es el que tenemos que consumir
export const FiltersContext = createContext<FiltersContextType>(defaultFiltersContext)

// Este es el que nos provee de acceso al contexto
export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState(defaultFiltersContext.filters)
  const [categorias, setCategorias ] = useState<string[]>([]);
  

  return (
    <FiltersContext.Provider value={{ filters, setFilters, categorias, setCategorias}}>
      {children}
    </FiltersContext.Provider>
  )
}