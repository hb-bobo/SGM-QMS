import * as React from 'react';
import { RouteWithSubRoutes } from '@/router';

const Search = (props) => {
    var routes = [];
    if (props.routes) {
        routes = props.routes;
    }
    return (
        <div>
            {routes.map((route, i) => {
                return(
                    <RouteWithSubRoutes key={i} {...route}/>
                )
            })}
        </div>
    )
}

export default Search;