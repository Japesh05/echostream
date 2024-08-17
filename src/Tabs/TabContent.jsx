import React from "react";
import PropTypes from 'prop-types'; 

function TabContent({ activeTab, id, text }) {
  return <div className={`${activeTab === id ? "" : "hidden"}`}>{text}</div>;
}

export default TabContent;

TabContent.propTypes = {
    activeTab: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
}
