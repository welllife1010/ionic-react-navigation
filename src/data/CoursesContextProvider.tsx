import React, { useState } from "react";

import CoursesContext, { Course, Goal } from "./courses-context";

const CoursesContextProvider: React.FC = props => {
    const [courses, setCourses] = useState<Course[]>([
        {
            id: "c1",
            title: "React.js - The Complete Guide",
            enrolled: new Date(),
            goals: [],
        },
    ]);

    const addCourse = (title: string, date: Date) => {
        const newCourse: Course = {
            id: Math.random().toString(),
            title,
            enrolled: date,
            goals: [],
        };

        setCourses(curCourses => {
            return curCourses.concat(newCourse);
        });
    };

    const addGoal = (courseId: string, text: string) => {
        const newGoal: Goal = { id: Math.random().toString(), text };

        setCourses(courses => {
            const updatedCourses = [...courses];
            const updatedCourseIndex = updatedCourses.findIndex(
                course => course.id === courseId
            );
            const updatedCourseGoals = updatedCourses[updatedCourseIndex].goals.concat(newGoal);
            const updatedCourse = { ...updatedCourses[updatedCourseIndex] };
            updatedCourse.goals = updatedCourseGoals;
            updatedCourses[updatedCourseIndex] = updatedCourse;
            return updatedCourses;
        });
    };

    const deleteGoal = () => { };

    const updateGoal = () => { };

    return (
        <CoursesContext.Provider
            value={{
                courses,
                addCourse,
                addGoal,
                deleteGoal,
                updateGoal,
            }}
        >
            {props.children}
        </CoursesContext.Provider>
    );
};

export default CoursesContextProvider;
