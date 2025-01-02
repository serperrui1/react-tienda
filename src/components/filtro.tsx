import { useFilters } from "../hooks/useFilters";
import "./filtro.css";
import React, { useState, useRef } from "react";

export function Filtro() {
  const { updateCategoryFilter, updateMinPrice, categorias, filters } = useFilters();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const rangeRef = useRef<HTMLInputElement>(null);

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    updateCategoryFilter(event.target.value);
  }

  function handleMinPrice(event: React.ChangeEvent<HTMLInputElement>) {
    updateMinPrice(parseInt(event.target.value));
    updateTooltipPosition();
  }

  const handleMouseEnter = () => {
    setTooltipVisible(true);
    updateTooltipPosition();
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const updateTooltipPosition = () => {
    if (rangeRef.current) {
      const rangeInput = rangeRef.current;
      const value = parseInt(rangeInput.value);
      const min = parseInt(rangeInput.min);
      const max = parseInt(rangeInput.max);
      const percentage = (value - min) / (max - min);
      const rangeWidth = rangeInput.offsetWidth;
      const tooltipX = rangeInput.getBoundingClientRect().left + rangeWidth * percentage;

      setTooltipPosition({ x: tooltipX, y: rangeInput.getBoundingClientRect().top });
    }
  };

  return (
    <>
      <div>
        0€ &nbsp;
        <div style={{ position: "relative", display: "inline-block" }}>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            onChange={handleMinPrice}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={rangeRef}
          />
          {tooltipVisible && (
            <div className="tooltip" style={{ left: tooltipPosition.x+3, top: tooltipPosition.y +20 }}
            >
              {filters.minPrice}€
            </div>
          )}
        </div>
        &nbsp;1000€ &nbsp;
        <select name="" id="" onChange={handleSelect} className="select">
          <option value="all">all</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Filtro;