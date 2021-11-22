import React, { useState, useRef } from "react";
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
    IonAlert,
    IonToast,
    IonModal,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { addOutline, create, trash } from "ionicons/icons";

import { COURSE_DATA } from "./Courses";
import EditModal from "../components/EditModal";

const CourseGoals: React.FC = () => {
    const [startedDeleting, setStartedDeleting] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<any>();

    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

    const selectedCourseId = useParams<{ courseId: string }>().courseId;

    const selectedCourse = COURSE_DATA.find((c) => c.id === selectedCourseId);

    const startDeleteGoalHandler = () => {
        setStartedDeleting(true);
    };

    const startEditGoalHandler = (goalId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        const goal = selectedCourse?.goals.find((g) => g.id === goalId);
        slidingOptionsRef.current?.closeOpened();
        if (!goal) {
            return;
        }
        setIsEditing(true);
        setSelectedGoal(goal);
    };

    const cancelEditGoalHandler = () => {
        setIsEditing(false);
        setSelectedGoal(null);
    };

    const startAddGoalHandler = () => {
        setIsEditing(true);
        setSelectedGoal(null);
    };

    const deleteGoalHandler = () => {
        setStartedDeleting(false);
        setToastMessage("Deleted goal!");
    };

    return (
        <React.Fragment>
            <EditModal
                show={isEditing}
                onCancel={cancelEditGoalHandler}
                editedGoal={selectedGoal}
            />
            <IonToast
                isOpen={!!toastMessage}
                message={toastMessage}
                duration={2000}
                onDidDismiss={() => {
                    setToastMessage("");
                }}
            />
            <IonAlert
                isOpen={startedDeleting}
                header="Are you sure?"
                message="Do you want to delete the goal? This cannot be undone."
                buttons={[
                    {
                        text: "No",
                        role: "cancel",
                        handler: () => {
                            setStartedDeleting(false);
                        },
                    },
                    {
                        text: "Yes",
                        handler: () => {
                            deleteGoalHandler();
                        },
                    },
                ]}
            ></IonAlert>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton
                                defaultHref="/courses/list"
                                color="light-contrast"
                            />
                        </IonButtons>
                        <IonTitle>
                            {selectedCourse ? selectedCourse.title : "No course found!"}
                        </IonTitle>
                        {!isPlatform("android") && (
                            <IonButtons slot="end">
                                <IonButton onClick={startAddGoalHandler} >
                                    <IonIcon slot="icon-only" icon={addOutline}/>
                                </IonButton>
                            </IonButtons>
                        )}
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {selectedCourse && (
                        <IonList>
                            {selectedCourse.goals.map((goal) => (
                                <IonItemSliding key={goal.id} ref={slidingOptionsRef}>
                                    <IonItemOptions side="start">
                                        <IonItemOption
                                            onClick={startDeleteGoalHandler}
                                            color="danger"
                                        >
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
                                        <IonItemOption
                                            onClick={startEditGoalHandler.bind(null, goal.id)}
                                        >
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
        </React.Fragment>
    );
};

export default CourseGoals;
