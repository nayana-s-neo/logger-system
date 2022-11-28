import React, { useState } from 'react'
import {useNavigate,useLocation} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Filter({applicationTypes, actionTypes, resetSearch, getNewDate}) {
  
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    let navigate = useNavigate();
    let currentPath  = useLocation();
    let path = currentPath.pathname;
    const query = new URLSearchParams(path);
    const handleNavigation = (event) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();   
        let urlStr = ""; 
        for (let [key, value] of formData.entries()) {
          if(value)
            urlStr = urlStr + '&'+key+"="+value;
        }
        if(fromDate && toDate)
        {
            urlStr = urlStr+"&fromDate="+getNewDate(fromDate)+"&toDate="+getNewDate(toDate);
        }
        navigate(urlStr);
      }
  return (
    <form data-testid="search-logger-form" onSubmit={handleNavigation}> 
          <div className="searchContainer">
            <div className="m-2">
              <label>Log ID</label>
              <input defaultValue={query.get('logId')} type="text" data-testid="log-id" name="logId" className="form-control" onChange={resetSearch}/>
            </div>
            <div className="m-2">
              <label>Application Type</label>
              <select name="applicationType" defaultValue={query.get('applicationType')} data-testid="application-type"  className="form-control" onChange={resetSearch}>
                <option value="">Select Application Type</option>
                {
                  applicationTypes.map((item) => {
                    return(
                      <option key={item} value={item}>{item}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="m-2">
              <label>Application Id</label>
              <input type="text" defaultValue={query.get('applicationId')} data-testid="application-id"  name="applicationId" className="form-control" onChange={resetSearch}/>
            </div>
            <div className="m-2">
              <label>Action Type</label>
              <select name="actionType" defaultValue={query.get('actionType')} data-testid="action-type"  className="form-control" onChange={resetSearch}>
              <option value="">Select Action Type</option>
                {
                  actionTypes.map((item) => {
                    return(
                      <option key={item} value={item}>{item}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="m-2">
              <label>From Date</label>
              <DatePicker className="form-control" selected={fromDate} onChange={(date:Date) => {setFromDate(date); resetSearch()}} className="form-control"/>
            </div>
            <div className="m-2">
              <label>To Date</label>
              <DatePicker  className="form-control" selected={toDate} onChange={(date:Date) => {setToDate(date); resetSearch()} } className="form-control" />
            </div>
            
            <button type="submit" data-testid="search-logger" className="btn btn-info">Search Logger</button>
            
          </div>
          </form>

  )
}

export default Filter