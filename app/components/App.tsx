import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom'

import ApplicationListContainer from "./ApplicationList/ApplicationListContainer";
import SceneContainer from "./Scene/SceneContainer";
import SceneListContainer from "./SceneList/SceneListContainer";

const App = () => (
    <Router>
        <div className="wrapper">
            <header className="main-header">

                <a href="" className="logo">
                    <span className="logo-mini"><b>Mobile App</b> Studio</span>

                    <span className="logo-lg"><b>Mobile App</b> Studio</span>
                </a>

                <nav className="navbar navbar-static-top" role="navigation">
                    <div className="navbar-custom-menu">
                    </div>
                </nav>
            </header>
            <aside className="main-sidebar">

                <section className="sidebar">

                    <div className="user-panel">
                        <div className="pull-left image">
                        </div>
                        <div className="pull-left info">
                            <p></p>
                            <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                        </div>
                    </div>

                    <ul className="sidebar-menu">
                        <li className="treeview">
                            <a href="#"><i className="fa fa-link"></i> <span>Applications</span> <i className="fa fa-angle-left pull-right"></i></a>
                            <ul className="treeview-menu">
                                <li><Link to="/application-list">Application list</Link></li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </aside>

            <div className="content-wrapper">
                <section className="content-header">
                    <Route name="application-list" path="/application-list/" component={ApplicationListContainer}/>
                    <Route name="scene" path="/scene/:id" component={SceneContainer}/>
                    <Route name="scene-list" path="/scene-list/:id" component={SceneListContainer}/>
                </section>

                <section className="content">

                </section>
            </div>

            <footer className="main-footer">
                <div className="pull-right hidden-xs">

                </div>

                <strong>Copyright &copy; 2017</strong>
            </footer>

            <div className="control-sidebar-bg"></div>
        </div>
    </Router>
);

export default App