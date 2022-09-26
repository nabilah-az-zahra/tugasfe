import React, { Children, PropsWithChildren, useState } from 'react';
import ActivitiesContext, { Activity, ActivitiesContextModel, ActivityType } from './activities-context';

const ActivitiesContextProvider: React.FC<PropsWithChildren> = (props) => {

    const [activities, setActivities] = useState<Activity[]>([
        {
            id: Math.random().toString(),
            title: 'Sleep',
            description: 'Sleep Well!',
            hour: '24:00',
            activityType: 'rest',
            imageUrl: '/assets/images/rest.jpeg',
            isCompleted: false
        },
        {
            id: Math.random().toString(),
            title: 'Work',
            description: 'Coding',
            hour: '7:00',
            activityType: 'work',
            imageUrl: '/assets/images/work.jpeg',
            isCompleted: false
        },
        {
            id: Math.random().toString(),
            title: 'Hobbies',
            description: 'Anything',
            hour: '16:00',
            activityType: 'hobby',
            imageUrl: '/assets/images/hobby.jpeg',
            isCompleted: false
        }
    ]);

    const addActivity = (title: string, description: string, activityType: ActivityType) => {
        let imageUrl = '';
        switch(activityType) {
            case 'rest':
                imageUrl = '/assets/images/rest.jpg'
                break;
            case 'hobby':
                imageUrl = '/assets/images/hobby.jpg'
                break;
            case 'work':
                imageUrl = '/assets/images/work.jpg'
                break;
            default:
                imageUrl = '/assets/images/work.jpg'
                break;
        };

        const activityDate = new Date();
        const hour = activityDate.getHours() + ':' + activityDate.getMinutes();

        const addActivity: Activity = {
            id: Math.random().toString(),
            title,
            description,
            hour,
            activityType,
            imageUrl,
            isCompleted: false
        };

        setActivities(currActivities => {
            return [...currActivities, addActivity]
        })
    };

    const completeActivity = (activityId: string) => {
        setActivities(currActivities => {
            const updatedActivities = [...currActivities];
            const selectedActivityIndex = activities.findIndex(act => act.id === activityId);
            const updatedActivity = {...updatedActivities[selectedActivityIndex], isCompleted: true};
            updatedActivities[selectedActivityIndex] = updatedActivity;
            return updatedActivities;
        });
    };

    const activitiesContext: ActivitiesContextModel = {
        activities,
        addActivity,
        completeActivity
    };

    return (
        <ActivitiesContext.Provider value={activitiesContext}>
            {props.children}
        </ActivitiesContext.Provider>
    );
};
export default ActivitiesContextProvider;