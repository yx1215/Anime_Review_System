import React from 'react';
import './view/FilterButton.css';


export default function FilterButton({filterName}){
    return(
        <div className="filter_button">
            <div className="filter">{filterName}</div>
        </div>
    )
}
export { FilterButton };
