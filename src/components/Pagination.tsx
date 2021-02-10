import * as React from 'react';
interface Lables {
    first?: string;
    last?: string;
    previous?: string;
    next?: string;

}

interface PageProps {
    initialPage?: number;
    pageSize?: number;
    maxPages?: number;
    label?: Lables;
    items?: any[];
    onChangePage?: (e: any) => void;
    styles?: object,
    disableDefaultStyles?: boolean
}

interface InitialState {
    totalItems: number,
    currentPage: number,
    pageSize: number,
    totalPages: number,
    startPage: number,
    endPage: number,
    startIndex: number,
    endIndex: number,
    pages: number[]
    onChangePage?:(e:any)=>void
}
const Pagination: React.FC<PageProps> = (props) => {
    const INITIALSTATE: InitialState = {
        totalPages: 1,
        currentPage: 1,
        pageSize: 5,
        totalItems: 5,
        startIndex: 0,
        startPage: 1,
        endPage: 1,
        endIndex: 1,
        pages: [],
       
    }
    const [pager, setPager] = React.useState({ ...INITIALSTATE })

    const setPage = (page: number) => {
        const { items, pageSize } = props
        if (page < 1 || page > pager.totalPages) return;
        const customPager = getPager(props.items?.length, page, props.pageSize)
        // get new page of items from items array
       if(items){
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        setPager(customPager);

        // call change page function in parent component
        if(props && props.onChangePage){
            props.onChangePage(pageOfItems);
        }
        
       }
   
    }

    const getPager = (totalItems: number = 1, currentPage: number = 1, pageSize: number = 10):InitialState => {
        let totalPages = Math.ceil(totalItems / pageSize);
        let startPage:number, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        }
        else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };

    }

    // if (!pager.pages || pager.pages.length <= 1) {
    //     // don't display pager if there is only 1 page
    //     return null;
    // }

    return (
        <ul className="pagination">
            <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                <a onClick={() => setPage(1)}>First</a>
            </li>
            <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                <a onClick={() => setPage(pager.currentPage - 1)}>Previous</a>
            </li>
            {pager.pages.map((page, index) =>
                <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                    <a onClick={() => setPage(page)}>{page}</a>
                </li>
            )}
            <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                <a onClick={() => setPage(pager.currentPage + 1)}>Next</a>
            </li>
            <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                <a onClick={() => setPage(pager.totalPages)}>Last</a>
            </li>
        </ul>
    );
}
Pagination.defaultProps = {
    initialPage: 1,
    pageSize: 10,
    maxPages: 10,
    label: { first: 'First', last: 'Last', previous: 'Previous', next: 'Next' }
}
export default Pagination;