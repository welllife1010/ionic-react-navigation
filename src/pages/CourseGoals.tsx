import React, { useState, useRef, useContext } from "react";
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
    IonIcon,
    IonFab,
    IonFabButton,
    isPlatform,
    IonAlert,
    IonToast,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { addOutline } from "ionicons/icons";

// import { COURSE_DATA } from "./Courses";
import EditModal from "../components/EditModal";
import EditableGoalItem from "../components/EditableGoalItem";
import CoursesContext from "../data/courses-context";

const CourseGoals: React.FC = () => {
    const [startedDeleting, setStartedDeleting] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<any>();

    const coursesCtx = useContext(CoursesContext);

    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

    const selectedCourseId = useParams<{ courseId: string }>().courseId;

    const selectedCourse = coursesCtx.courses.find(c => c.id === selectedCourseId);

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

    const addGoalHandler = (text: string) => {
        coursesCtx.addGoal(selectedCourseId, text);
        setIsEditing(false);
    };

    return (
        <React.Fragment>
            <EditModal
                show={isEditing}
                onCancel={cancelEditGoalHandler}
                onSave={addGoalHandler}
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
                                <IonButton onClick={startAddGoalHandler}>
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
                                <EditableGoalItem
                                    key={goal.id}
                                    text={goal.text}
                                    slidingRef={slidingOptionsRef}
                                    onStartDelete={startDeleteGoalHandler}
                                    onStartEdit={startEditGoalHandler.bind(null, goal.id)}
                                />
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
