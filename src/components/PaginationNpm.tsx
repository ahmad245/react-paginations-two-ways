import * as React from 'react';
import ReactPaginate from 'react-paginate';

const getData=(offset=1)=>{
    let items=    {
           data:[
                 {name:'item 1'},
                 {name:'item 2'},
                 {name:'item 3'},
                 {name:'item 4'},
                 {name:'item 5'},
                 {name:'item 6'},
                 {name:'item 7'},
                 {name:'item 8'},
                 {name:'item 9'},
                 {name:'item 10'},
                 {name:'item 11'},
                 {name:'item 12'},
                 {name:'item 13'},
                 {name:'item 14'},
                 {name:'item 15'},
                 {name:'item 16'},
                 {name:'item 17'},
                 {name:'item 18'},
                 {name:'item 19'},
                 {name:'item 20'},
                 {name:'item 21'},
                 {name:'item 22'},
                 {name:'item 23'},
                 {name:'item 24'},
                 {name:'item 25'},
                 {name:'item 26'},
                 {name:'item 27'},
                 {name:'item 28'},
                 {name:'item 29'},
                 {name:'item 30'},
                 {name:'item 31'},
                 {name:'item 32'},
                 {name:'item 34'},
                 {name:'item 299'},
                 {name:'item 64'},
                 {name:'item 6463'},
                 {name:'item 684'},
                 {name:'item 65'},
   
               ]
              
       }
       let result= getPaginatedItems(items.data,offset)
       return {
           meta:{
               total_count :items.data.length,
               perPage:5
           },
           data:result
       }
   }
   function getPaginatedItems(items:any[], offset:number) {
       return items.slice(offset, offset + 5);
     }

interface Comment{
    name:string;
}
interface Comments{
    data:Comment[];
    offset:number;
    pageCount: number;
}
const PaginationNpm = (props: any) => {

    // pageCount: Math.ceil(data.meta.total_count / data.meta.limit),
    const initialState:Comments = { data:[], offset: 0,pageCount:0 }
    const [pageState, setPageState] = React.useState({ ...initialState })
    var exampleItems=getData(1) ;
    const handlePageClick = (data: any) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * props.perPage);
        let oldState={...pageState};
        let result=getData(offset);
        oldState.data=result.data;
        oldState.offset=offset;
      let  pageCount= Math.ceil(result.meta.total_count / 2);
      oldState.pageCount=pageCount;
        setPageState(oldState);
    };
    React.useEffect(()=>{
        let oldState={...pageState};
         oldState.data=exampleItems.data;
       let  pageCount= Math.ceil(exampleItems.meta.total_count / 2);
       oldState.pageCount=pageCount
           setPageState(oldState);
           console.log(oldState,pageState);
           
    },[])
  
    ;
      


    return (
        <div className="commentBox">
        {pageState && pageState.data.map((el)=>{
            return <p key={el.name}>{el.name}</p>
        })}
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageState.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                //   subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
    );
}

export default PaginationNpm;