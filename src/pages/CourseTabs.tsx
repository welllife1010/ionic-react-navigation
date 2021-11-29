import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { list, trophyOutline } from "ionicons/icons";
import { Route, Redirect, Switch } from 'react-router-dom';

import Courses from './Courses';
import AllGoals from './AllGoals';
import CourseGoals from './CourseGoals';

const CourseTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect path="/courses" to="/courses/all-goals" exact />
                <Switch>
                    <Route path="/courses/list" exact>
                        <Courses />
                    </Route>
                    <Route path="/courses/all-goals" exact>
                        <AllGoals />
                    </Route>
                    <Route path="/courses/:courseId">
                        <CourseGoals />
                    </Route>
                </Switch>
            </IonRouterOutlet>
            <IonTabBar slot="bottom" color="primary">
                <IonTabButton tab="all-goals" href="/courses/all-goals">
                    <IonIcon icon={list} />
                    <IonLabel>All Goals</IonLabel>
                </IonTabButton>
                <IonTabButton tab="courses" href="/courses/list">
                    <IonIcon icon={trophyOutline} />
                    <IonLabel>Courses</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default CourseTabs;