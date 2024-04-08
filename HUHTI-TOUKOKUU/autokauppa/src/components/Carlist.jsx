import Button from '@mui/material/Button';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from "react";
import { fetchCars } from "../carapi";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function Carlist() {
    const [cars, setCars] = useState([]);


    const [colDef] = useState([
        { field: 'brand', filter: true, width:130  },
        { field: 'model', filter: true,  width:130  },
        { field: 'color', filter: true, width:130 },
        { field: 'fuel', filter: true, width: 130 },
        { field: 'modelYear', filter: true, width: 170, headerName: "Model Year" }, // Muuta width-arvoa tarpeen mukaan
        { field: 'price', filter: true, width: 120, headerName: "Price" },
        {
            cellRenderer: params => <EditCar data={params.data} updateCar={updateCar} className="edit-button" />,
            cellClass: "edit-cell",
            width: 120
        },
        { 
            cellRenderer: params => 
            <Button
            className="delete-button"
            size="small"
            color="error"
            onClick={() => deleteCar(params.data._links.car.href)}
          >
            Delete
          </Button>,
          cellClass: "delete-cell",
        width: 120,

      },
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchCars()
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }

    const deleteCar = (url) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, { method: 'DELETE' })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in deletion: " + response.statusText);
                
                return response.json();
            })
            .then(() => handleFetch())
            .catch(err => console.error(err))
        }
    }

    const addCar = (newCar) => {
        fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(newCar)
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding car: " + response.statusText);
            return response.json();
        })
        .then(() => handleFetch())
        .catch(err => console.error(err))
    }

    const updateCar = (url, updatedCar) => {
        fetch(url, {
            method: 'PUT',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(updatedCar)
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Error whan updating: " + response.statusText)
            
            return response.json();
        })
        .then(() => handleFetch())
        .catch(err => console.error(err))
    }

    return(
        <>
            <AddCar addCar={addCar} />
            <div className="ag-theme-quartz" style={{ height: 600 }}>
                <AgGridReact 
                    rowData={cars}
                    columnDefs={colDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );
}

export default Carlist;