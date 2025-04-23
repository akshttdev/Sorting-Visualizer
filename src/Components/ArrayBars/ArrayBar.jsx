import React from "react";
import "./ArrayBar.css";

const ArrayBar = ({ array = [] }) => {
  if (!array.length) return null;

  const max = Math.max(...array);
  const sides = ["right", "left", "front", "back"];

  return (
    <div className="bar-container">
      {array.map((value, index) => {
        const percentage = (value / max) * 70;
        const height = `${percentage}vh`;

        return (
          <div 
            className="bar" 
            key={index}
            data-value={value}
            data-index={index}
          >
            <div className="side top"></div>
            <div className="side bottom"></div>

            {sides.map((side) => (
              <div className={`side ${side}`} key={side}>
                <div
                  className={`color-bar ${side}-color-bar`}
                  style={{
                    height,
                    bottom: 0,
                  }}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ArrayBar;