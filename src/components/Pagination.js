import React, { useEffect, useState } from 'react';

function Pagination({recordCount,perPage,getRecords}) {
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  let remaining = parseInt(recordCount%perPage) > 0 ? 1 : 0;
  useEffect(() => {
    setPages( Array.from({length: parseInt(recordCount/perPage) + remaining}, (_, i) => i + 1));
  },[recordCount])

  const displayRecords = (page) => {
    getRecords(page);
    setActivePage(page);
  }
  return (
    <>
        {
            pages.map((page) => {
                let activeClass  = "";
                if(page == activePage)
                    activeClass = "activePage";
                return(
                    <span data-testid={`page-test-id${page}`} className={`pageNum ${activeClass}`} onClick = { () => displayRecords(page)} >{page}</span>
                )
            })
        }
    </>
  )
}

export default Pagination