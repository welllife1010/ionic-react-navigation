import React from "react";
import {
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButton,
    IonPage,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonFab,
    IonFabButton,
    isPlatform,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { COURSE_DATA } from "./Courses";
import { addOutline, create, trash } from "ionicons/icons";

const CourseGoals: React.FC = () => {
    const selectedCourseId = useParams<{ courseId: string }>().courseId;

    const selectedCourse = COURSE_DATA.find((c) => c.id === selectedCourseId);

    const deleteGoalHandler = () => {
        console.log("Deleted");
    };

    const startEditGoalHandler = (event: React.MouseEvent) => {
        event.stopPropagation();
        console.log("Edited");
    };

    const startAddGoalHandler = () => {
        console.log("Adding goal...");
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/courses/list" />
                    </IonButtons>
                    <IonTitle>
                        {selectedCourse ? selectedCourse.title : "No course found!"}
                    </IonTitle>
                    {!isPlatform("android") && (
                        <IonButtons slot="end">
                            <IonButton>
                                <IonIcon slot="icon-only" icon={addOutline} />
                            </IonButton>
                        </IonButtons>
                    )}
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {selectedCourse && (
                    <IonList>
                        {selectedCourse.goals.map((goal) => (
                            <IonItemSliding key={goal.id}>
                                <IonItemOptions side="start">
                                    <IonItemOption onClick={deleteGoalHandler} color="danger">
                                        <IonIcon slot="icon-only" icon={trash} />
                                    </IonItemOption>
                                </IonItemOptions>
                                <IonItem
                                    lines="full"
                                // button
                                // onClick={deleteItemHandler}
                                >
                                    <IonLabel>{goal.text}</IonLabel>
                                    {/* <IonButton
                                        fill="clear"
                                        color="dark"
                                        slot="end"
                                        onClick={startEditGoalHandler}
                                    >
                                        <IonIcon slot="icon-only" icon={create} />
                                    </IonButton> */}
                                </IonItem>
                                <IonItemOptions side="end">
                                    <IonItemOption onClick={startEditGoalHandler}>
                                        <IonIcon slot="icon-only" icon={create} />
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                        ))}
                    </IonList>
                )}
                {isPlatform("android") && (
                    <IonFab horizontal="end" vertical="bottom" slot="fixed">
                        <IonFabButton color="secondary" onClick={startAddGoalHandler}>
                            <IonIcon icon={addOutline} />
                        </IonFabButton>
                    </IonFab>
                )}
            </IonContent>
        </IonPage>
    );
};

export default CourseGoals;
