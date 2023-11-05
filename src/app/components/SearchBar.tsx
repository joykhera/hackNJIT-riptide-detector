"use client"
import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
type Item = {
    id: number;
    name: string;
}

function SearchBar() {
    const items = [
        {
            id: 0,
            name: "san_francisco_ca"
        },
        {
            id: 1,
            name: "the_Battery_ny"
        },
        {
            id: 2,
            name: "rehoboth_beach_md"
        },
        {
            id: 3,
            name: "key_west_fl"
        },
        {
            id: 4,
            name: "providence_visibility"
        },
        {
            id: 5,
            name: "cape_henry_ports_station"
        },
        {
            id: 6,
            name: "southport_nc"
        },
        {
            id: 7,
            name: "eastport_estes_head"
        },
        {
            id: 8,
            name: "grays_harbor_entrance_wa"
        },
        {
            id: 9,
            name: "sewells_point_va"
        },
        {
            id: 10,
            name: "buffalo_ny"
        }
    ]

    const handleOnSearch = (string: string, results: Item[]) => {
        console.log(string, results);
    };

    const handleOnHover = (result: Item) => {
        console.log(result);
    };

    const handleOnSelect = (item: Item) => {
        console.log(item);
    };

    const formatResult = (beach: Item) => {
        return (
            <span style={{ display: 'block', textAlign: 'left' }}>{beach.name}</span>
        );
    };
    
    const handleFocus = () => {
        console.log('Focused');
    }

    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        autoFocus
                        onFocus={handleFocus}
                        formatResult={formatResult}
                        showItemsOnFocus={true}
                        maxResults={items.length}
                    />
                </div>
            </header>
        </div>
    );
}

export default SearchBar;
