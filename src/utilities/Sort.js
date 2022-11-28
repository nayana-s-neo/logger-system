    //sort results
    export const sortResults = (sortBy,order) => (a, b) => {
        // equal items sort equally
        if (a[sortBy] === b[sortBy])
            return 0;
        
        // nulls sort 
        if (a[sortBy] === null) 
            return 1;
        
        // nulls sort 
        if (b[sortBy] === null)
                return -1;
        
        //sort alphanumeric        
        if(isNaN(a[sortBy]) && isNaN(b[sortBy]))
        {
            if(order === 'asc')
            return  a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;
            else
            return  a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? -1 : 1;
        }
        //sort numeric
        if(order === 'asc')  
            return  a[sortBy] > b[sortBy] ? 1 : -1;
        else
            return  a[sortBy] > b[sortBy] ? -1 : 1;
    }
        

    //function to set sort icon & order
    export const sorting = (event) => {
    let sort = 'desc';
    if(event.target.querySelector('span'))
    {
        if((event.target.querySelector('span').getAttribute("class") === "glyphicon glyphicon-sort-by-attributes"))
        {
        event.target.querySelector('span').setAttribute("class","glyphicon glyphicon-sort-by-attributes-alt");
        }       
        else
        {
        event.target.querySelector('span').setAttribute("class","glyphicon glyphicon-sort-by-attributes");
        sort = 'asc';
        } 
    }
    else{
        if((event.target.getAttribute("class") === "glyphicon glyphicon-sort-by-attributes"))
        {
        event.target.setAttribute("class","glyphicon glyphicon-sort-by-attributes-alt");
        }
        else
        {
        event.target.setAttribute("class","glyphicon glyphicon-sort-by-attributes");
        sort = 'asc';
        }          
    }
    return sort;
    }


