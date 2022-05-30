import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CardStats = ({
  statId,
  statTitle,
  statIconName,
  statIconColor,
}) => {
  const [statDataValue, setStatDataValue] = useState(false);
  
  // Update data
  useEffect(() => {
    setTimeout(() => {
      
      fetch('http://localhost:3001/' + statId, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        // Empty array if no data
        if (!response.ok) return;
        // Parse data
        return response.json();
      })
      .then((data) => {
        // Check if there are data
        if (!data) return;
        // Get value
        const value = data.value || [];
        // Update state
        setStatDataValue(value);
        // Log
        console.log('Update value of ' + statId + ': ' + value);
      })
      .catch(function (err) {
        console.log("Unable to fetch - ", err);
      });

    }, 5000);
  }, [statId]);

  // Print data
  return (
    <>
      <div id={statId} className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg fixed-min-height">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {statTitle}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                {statDataValue ? "YES" : "NO"}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CardStats.defaultProps = {
  statId: "light",
  statTitle: "Example",
  statIconName: "far fa-chart-bar",
  statIconColor: "bg-red-500",
};

CardStats.propTypes = {
  statId: PropTypes.string,
  statTitle: PropTypes.string,
  // can be any of the text color utilities
  // from tailwindcss
  statIconName: PropTypes.string,
  // can be any of the background color utilities
  // from tailwindcss
  statIconColor: PropTypes.string,
};

export default CardStats;
