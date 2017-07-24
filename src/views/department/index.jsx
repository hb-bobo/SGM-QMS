import * as React from 'react';
import { RouteWithSubRoutes } from '@/router';

/* 部门质量 */
const Department = (props) => {
    var routes = [];
    if (props.routes) {
        routes = props.routes;
    }
    return (
        <div>
            <div className="text-center">
                <h2>暂未开通</h2>
            </div>
            {routes.map((route, i) => {
                return(
                    <RouteWithSubRoutes key={i} {...route}/>
                )
            })}
        </div>
    )
}

export default Department;