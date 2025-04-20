import React from "react";
import PropTypes from "prop-types";
import "./ArrayBar.css";

const ArrayBar = ({ array }) => {
  const max = Math.max(...array);
  const sides = ["right", "left", "front", "back"];

  return (
    <div className="bar-container">
      {array.map((value, index) => {
        const height = `${(value / max) * 70}vh`;
        const translateY = `${70 - (value / max) * 70}vh`;

        return (
          <div className="bar" key={index}>
            <div className="side top"></div>
            <div className="side bottom"></div>

            {sides.map((side) => (
              <div className={`side ${side}`} key={side}>
                <div
                  className={`color-bar ${side}-color-bar`}
                  style={{
                    height,
                    transform: `translateY(${translateY})`,
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

ArrayBar.propTypes = {
  array: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ArrayBar;

