import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useLocation} from "react-router-dom";
import axios from 'axios';
import Pagination from './Pagination';
import Filter from './Filter';
import {sortResults,sorting} from './Sort';

function List() {
    const [currentPage, setCurrentPage] = useState(1);
    const [loggerDataSet, setLoggerDataSet] = useState([]);
    const [logger, setLogger] = useState([]);
    const [recordCount, setRecordCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentLogger, setCurrentLogger] = useState([]);
    const [applicationTypes, setApplicationTypes] = useState([]);
    const [actionTypes, setActionTypes] = useState([]);
    const [noResult, setNoResult] = useState(false);
    let search  = useLocation();
    const perPage = 10;
    let currentPath;

    //function to format date
    const getNewDate = (dt) => {
      let date = new Date(dt);
      let month = parseInt(date.getMonth())+parseInt(1);
      let newDt = date.getFullYear()+"-"+month+"-"+date.getDate();
      return newDt;
    }
    useEffect(() => {
      axios({
        method : "get",
        url : "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
      }).then((response) => {
        console.log(response);
        const dataSet = response?.data?.result?.auditLog
        //application types array
        const applicationTypes = [...new Set(dataSet.map(item => item.applicationType))];
        const appTypes = applicationTypes.filter((item) => {
          return item != null;
        })
        setApplicationTypes(appTypes);

        //action types array
        const actionTypes = [...new Set(dataSet.map(item => item.actionType))];
        setActionTypes(actionTypes);

        //set result 
        setLogger(dataSet);
        setLoggerDataSet(dataSet);
        setRecordCount(response?.data?.result?.recordsFiltered);
        setLoading(false);
        setCurrentLogger(dataSet.slice(0,10));
        if(search.pathname.length > 1)
          handleSubmit(dataSet);
      },(error) => {
          console.log("error",error);
      })
    }, [])
   
    //function to sort data
    const sortData = (event) => {
        let sortBy = event.target.getAttribute('data-id');
        const sort = sorting(event);
        let loggerData = logger.sort(sortResults(sortBy,sort));
        setLogger(loggerData);
        getRecords(currentPage);
    }

    //function to refresh records after changes
    const getRecords = useCallback ((page) => {
      setCurrentPage(page);
      let start = ((page-1) * perPage) + 1;
      let end = start + (perPage-1);  
      const data= logger.slice(start-1,end)
      setCurrentLogger(data);
    },[logger, currentLogger])
    
    //function to reset records
    const resetSearch = () => {
      setLogger(loggerDataSet);
    }
    useEffect(() => {
      currentPath = search.pathname;
      handleSubmit(logger);
   }, [search]);

    //function to filter results 
    const handleSubmit = (data) => {
      if(search.pathname.length > 1)
      {
      const query = new URLSearchParams(currentPath);
          let searchData = data.filter(item => {
            let formLength = 0;
            let matchItem = 0;
            for (let [key, value] of query.entries()) {
              if(value)
              {
                  formLength++;    
                  if(item['creationTimestamp']) //code to handle start & end date filterring
                  {
                    let newDt = getNewDate(item['creationTimestamp']);
                    let fromNewDt = query.get('fromDate');
                    let toNewDt = query.get('toDate');
                    if(newDt >= fromNewDt && newDt <= toNewDt)
                    {
                      matchItem++;
                    }
                        
                  } 
                  if(isNaN(value) && !item['creationTimestamp']) //filtering alphanumeric
                  {
                    if(item[key])
                    {
                      if((item[key].toLowerCase()).toString().includes(value.toLowerCase()))
                      {
                        matchItem++;
                      }
                    }
                    
                  }
                  else {   //filtering numeric
                    if(item[key])
                    {
                      if((item[key]).toString().includes(value))
                      {
                        matchItem++;
                      }
                    }

                  }
              }
            }
            if (matchItem == formLength) 
            {
              return item;
            }   
        })
        
      if(searchData.length)
      {
       
        setNoResult(false);
        setRecordCount(searchData.length);
        setLogger(searchData);
        setCurrentLogger(searchData.slice(0,10));
      }
      else
      {
        setNoResult(true);
        setRecordCount(0);
        setLogger([]);
        setCurrentLogger([]);
      }
    }
    else {
        setRecordCount(logger.length);
        setLogger(logger);
        setCurrentLogger(logger.slice(0,10));      
    }
    }
    
    if(!loading)
    {
  return (
      <div className="container-fluid">
      <Filter  applicationTypes={applicationTypes} actionTypes={actionTypes}  resetSearch={resetSearch} getNewDate={getNewDate}/>
      <hr />
      <table className="table" data-testid = "table-id">
  <thead>
    <tr>
      <th scope="col" data-id = "logId" onClick={sortData}>Log ID <span className="glyphicon glyphicon-sort-by-attributes-alt" data-id = "logId" aria-hidden="true"></span></th>
      <th scope="col" data-id = "applicationType" onClick={sortData}>Application Type <span className="glyphicon glyphicon-sort-by-attributes-alt" data-id = "applicationType" aria-hidden="true"></span></th>
      <th scope="col" data-id = "applicationId" onClick={sortData}>Application ID <span className="glyphicon glyphicon-sort-by-attributes-alt" data-id = "applicationId" aria-hidden="true"></span></th>
      <th scope="col" data-id = "actionType" onClick={sortData}>Action <span className="glyphicon glyphicon-sort-by-attributes-alt" data-id = "actionType" aria-hidden="true"></span></th>
      <th scope="col" data-id = "logInfo" onClick={sortData}>Action Details <span className="glyphicon glyphicon-sort-by-attributes-alt" data-id = "logInfo" aria-hidden="true"></span></th>
      <th scope="col" data-id = "creationTimestamp" onClick={sortData}>Date : Time <span className="glyphicon glyphicon-sort-by-attributes-alt" data-id = "creationTimestamp" aria-hidden="true"></span></th>
    </tr>
  </thead>
  <tbody>
      {
          currentLogger?.map((log)=>{
              return(
                <tr key={log.logId}>
                    <td>{log.logId}</td>
                    <td>{log.applicationType}</td>
                    <td>{log.applicationId}</td>
                    <td>{log.actionType}</td>
                    <td>{log.logInfo}</td>
                    <td>{log.creationTimestamp}</td>
                </tr>
              )
          })
      }
    </tbody>
    </table>
    <Pagination recordCount={recordCount} perPage={10} getRecords={getRecords}/>
    {
      noResult  &&
      <h3 className='text-center'>No Results found</h3> 
    }
    </div>
  )
    }
}
export default List