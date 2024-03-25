import React from 'react';
import "../../css/tab.css";
import "../../css/text.css";

export default function TabButton({ children, onClick, activeTab, className }) {

    return (
        <li className={`tab-base text-size-3 text-weight-medium ${className}`} onClick={onClick}>
            {children}
        </li>
    );
}
