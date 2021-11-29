import React, { useState, useContext } from "react";
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
    IonButtons,
    IonIcon,
    isPlatform,
    IonFab,
    IonFabButton,
} from "@ionic/react";
// import { useHistory } from 'react-router-dom';
import { addOutline } from "ionicons/icons";

import AddCourseModal from "../components/AddCourseModal";
import CourseItem from "../components/CourseItem";
import CoursesContext from "../data/courses-context";

export const COURSE_DATA = [
    {
        id: "c1",
        title: "Ionic + React - The Practical Guide",
        enrolled: new Date("11/07/2021"),
        goals: [
            { id: "c1g1", text: "Finish the course!" },
            { id: "c1g2", text: "Learn a lot!" },
        ],
    },
    {
        id: "c2",
        title: "React.js - The Complete Guide",
        enrolled: new Date("08/05/2020"),
        goals: [
            { id: "c2g1", text: "Finish the course!" },
            { id: "c2g2", text: "Learn a lot!" },
        ],
    },
    {
        id: "c3",
        title: "JavaScript - The Complete Guide",
        enrolled: new Date("03/22/2019"),
        goals: [
            { id: "c3g1", text: "Finish the course!" },
            { id: "c3g2", text: "Learn a lot!" },
        ],
    },
];

const Courses: React.FC = () => {
    // const history = useHistory();
    // const changePageHandler = () => {
    //     history.push('/course-goals');
    // }

    const coursesCtx = useContext(CoursesContext);

    const [isAdding, setIsAdding] = useState(false);

    const startAddCourseHandler = () => {
        setIsAdding(true);
    };

    const cancelAddCourseHandler = () => {
        setIsAdding(false);
    };

    const courseAddHandler = (title: string, date: Date) => {
        coursesCtx.addCourse(title, date);
        setIsAdding(false);
    };

    return (
        <React.Fragment>
            <AddCourseModal show={isAdding} onCancel={cancelAddCourseHandler} onSave={courseAddHandler}/>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Courses</IonTitle>
                        {!isPlatform("android") && (
                            <IonButtons slot="end">
                                <IonButton onClick={startAddCourseHandler}>
                                    <IonIcon slot="icon-only" icon={addOutline} />
                                </IonButton>
                            </IonButtons>
                        )}
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {/* <h2>This works - courses page!</h2>
                        <div>
                            <IonButton routerLink="/course-goals">To Course Goals</IonButton>
                            <IonButton onClick={changePageHandler}>To Course Goals</IonButton>
                        </div> */}
                    <IonGrid>
                        {coursesCtx.courses.map((course) => (
                            <IonRow key={course.id}>
                                <IonCol size-md="4" offset-md="4">
                                    <CourseItem
                                        title={course.title}
                                        enrolmentDate={course.enrolled}
                                        id={course.id}
                                    />
                                </IonCol>
                            </IonRow>
                        ))}
                    </IonGrid>
                    {isPlatform("android") && (
                        <IonFab horizontal="end" vertical="bottom" slot="fixed">
                            <IonFabButton color="secondary" onClick={startAddCourseHandler}>
                                <IonIcon icon={addOutline} />
                            </IonFabButton>
                        </IonFab>
                    )}
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default Courses;
