import React from "react";
import {
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButton,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
} from "@ionic/react";
// import { useHistory } from 'react-router-dom';

export const COURSE_DATA = [
    {
        id: "c1", 
        title: "Ionic + React - The Practical Guide", 
        enrolled: new Date('11/07/2021'), 
        goals: [
            { id: 'c1g1', text: 'Finish the course!'},
            { id: 'c1g2', text: 'Learn a lot!'},
        ]
    },
    {   id: "c2", 
        title: "React.js - The Complete Guide", 
        enrolled: new Date('08/05/2020'),
        goals: [
            { id: 'c2g1', text: 'Finish the course!' },
            { id: 'c2g2', text: 'Learn a lot!' },
        ]
    },
    { 
        id: "c3", 
        title: "JavaScript - The Complete Guide", 
        enrolled: new Date('03/22/2019'),
        goals: [
            { id: 'c3g1', text: 'Finish the course!' },
            { id: 'c3g2', text: 'Learn a lot!' },
        ]
    },
];

const Courses: React.FC = () => {
    // const history = useHistory();
    // const changePageHandler = () => {
    //     history.push('/course-goals');
    // }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Courses</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {/* <h2>This works - courses page!</h2>
                <div>
                    <IonButton routerLink="/course-goals">To Course Goals</IonButton>
                    <IonButton onClick={changePageHandler}>To Course Goals</IonButton>
                </div> */}
                <IonGrid>
                    {COURSE_DATA.map((course) => (
                        <IonRow key={course.id}>
                            <IonCol size-md="4" offset-md="4">
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>{course.title}</IonCardTitle>
                                        <IonCardSubtitle>Enrolled on {course.enrolled.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <div className="ion-text-right">
                                            <IonButton
                                                fill="clear"
                                                color="secondary"
                                                routerLink={`/courses/${course.id}`}
                                            >
                                                View Course Goals
                                            </IonButton>
                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    ))}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Courses;
