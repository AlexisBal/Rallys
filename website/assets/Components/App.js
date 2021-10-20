import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Login from './Public/Login';
import Register from './Public/Register';
import Home from './Public/Home';


class App extends React.Component {

    render() {
        return (
            <div className="container py-5 px-4">
                <div className="row rounded-lg overflow-hidden shadow">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path='/register' component={Register}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;