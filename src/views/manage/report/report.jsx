import * as React from 'react';
// import { RouteWithSubRoutes } from '@/router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import ResultIndex from './result-index/result-index';
import ProcessIndex from './process-index/process-index';

import intl from '@/components/intl';
import CreateTabs from '@/components/create-tabs';

// 质量月报菜单配置
const menuData = [
    {
        tabTitle: intl.get('QMS.ResultIndex'),
        tabContent: ResultIndex,
        path: 'manage/report'
    },
    {
        tabTitle: intl.get('QMS.ProcessIndex'),
        tabContent: ProcessIndex,
        path: 'manage/report'
    }
];

/* 质量月报 */
class QualityMonthReport extends React.Component {
    state = {
        title: intl.get('QMS.manage/report'),
        isIndex: true,
    }

    /*back*/
    goBack = () => {
        this.props.history.go(-1);
        if (this.props.match.path === '/manage/quality-month-report') {
            this.setState({
                isIndex: true
            });
        }
    }
    componentDidMount () {
        this.setState({
            title: intl.get('QMS.manage/report')
        });
    }
    render () {
        return (
            <div>
                {/*头部*/}
                <AppBar
                    title={this.state.title}
                    titleStyle={{textAlign: 'center'}}
                    iconElementLeft={
                        <IconButton onClick={this.goBack}>
                            <NavigationArrowBack color={'#FFF'}/>
                        </IconButton>
                    }
                    iconElementRight={
                        <span style={{display: 'inline-block', width: '2.6em'}}></span>
                    }   
                />
                {/*tab and tabContent*/}
                <CreateTabs menuData={menuData} parent={this}/>
            </div>
        )
    }
    
}

export default QualityMonthReport;