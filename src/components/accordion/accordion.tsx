import * as React from 'react';
import AccordionProps  from './PropTypes';

/*class AccordionPanel extends React.Component<AccordionProps, any> {

   
    componentWillReceiveProps () {
        console.log(3)
    }
    componentWillMount () {
        console.log(4)
    }
    render () {
        return (
            <div>
                q
            </div>
        )
    }
}*/

class Accordion extends React.Component<AccordionProps, any> {

    componentWillReceiveProps () {
        console.log(3)
    }
    componentWillMount () {
        console.log(4)
    }
    render () {
        return (
            <div>
                q
            </div>
        )
    }
}

// Accordion.panel = AccordionPanel;
export default Accordion;