import * as React from 'react';
import PropTypes from 'prop-types';
import ProjectProgress from '@/components/project-progress';

class NewProjectOverview extends React.Component {
    componentDidMount ()　{
       /* fetch(AppConfig.API + '/getData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "path": "data.json"
            })
        }).then((res) => {
            return res.json()
        }).then((res) => {
            this.props.actions.fillListData(res.EQRHotIssue.issueList)
            console.log(res)
        })*/
        this.props.actions.fillListData(data.EQRHotIssue.issueList)
    }
    render () {
        return (
            <ProjectProgress></ProjectProgress>
        )
    }
}

export default NewProjectOverview