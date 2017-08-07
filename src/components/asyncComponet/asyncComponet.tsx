import * as React from 'react';
import { EsModule } from '@/types';

interface State {
    Component: null | React.ComponentClass<{}>;
}

export const asyncComponet = (importComponet: Function) => (
    class AsyncComponet extends React.Component<{}, {}> {

        state: State = {
            Component: null
        }

        componentWillMount () {
            if (this.state.Component !== null) { return false; }
            importComponet()
                .then((module: EsModule) => module.default)
                .then((Component: React.ComponentClass<{}>) => {
                    this.setState({
                        Component
                    });
                })
                .catch((err: Error) => {
                    console.error('load Componet failed');
                    throw err;
                });
            return false;
        }

        render () {
            var {Component} = this.state;
            return (Component !== null) ? <Component {...this.props}/> : null;
        }

    }
)