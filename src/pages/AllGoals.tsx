import React from 'react';
import { IonHeader, IonContent, IonToolbar, IonTitle, IonPage, IonButton, IonMenuButton } from '@ionic/react';

const AllGoals: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton slot="start">
                        <IonMenuButton />
                    </IonButton>
                    <IonTitle>
                        All Goals
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h2>This works - all goals page!</h2>
            </IonContent>
        </IonPage>
        
    );
};

export default AllGoals;