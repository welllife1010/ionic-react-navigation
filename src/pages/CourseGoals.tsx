import React from 'react';
import { IonHeader, IonContent, IonToolbar, IonTitle, IonButton, IonPage, IonButtons, IonBackButton, IonList, IonItem, IonLabel } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { COURSE_DATA } from './Courses';

const CourseGoals: React.FC = () => {

    const selectedCourseId = useParams<{courseId: string}>().courseId;

    const selectedCourse = COURSE_DATA.find(c => c.id === selectedCourseId);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/"/>
                    </IonButtons>
                    <IonTitle>
                        {selectedCourse ? selectedCourse.title : 'No course found!'}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {selectedCourse && <IonList>
                    {selectedCourse.goals.map(goal => 
                    <IonItem key={goal.id}>
                        <IonLabel>{goal.text}</IonLabel>
                    </IonItem>
                    )}
                </IonList>}
            </IonContent>
        </IonPage>
    );
};

export default CourseGoals;