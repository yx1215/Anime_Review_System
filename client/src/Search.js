import React from 'react';
import './view/Search.css'
export default function Search(){
    return(
        <div className="body">
            <div className="title">
                AniME
            </div>
            <div className="searchBar">
                <input className="input"/>
                <button className="searchButton">find your love</button>
            </div>
            <div className="otherInfo">
                <div className="optionUnit">
                    <div className="text">login</div>
                    <div className="line"></div>
                </div>
                <div className="optionUnit">
                    <div className="text">register</div>
                    <div className="line"></div>
                </div>
            </div>
        </div>

    )
}
export { Search };
