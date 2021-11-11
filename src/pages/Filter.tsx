import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';
import React from 'react';

const Filter: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>
                        Filter
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h2>The filter page...</h2>
            </IonContent>
        </IonPage>
    );
}

export default Filter;