import { selector } from "recoil";
import { courseState } from "../atoms/course";


export const isCourseLoading = selector({
    key: "isCourseLoading",
    get: ({get}) => {
        const state = get(courseState);
        return state.isLoading;
    }  
});

export const courseDetails = selector({
    key: "courseDetailsState",
    get: ({get}) => {
        const state = get(courseState);
        return state.course;
    }
});

export const courseTitle = selector({
    key: "courseTitleState",
    get: ({get}) => {
        const state = get(courseState);
        if(state.course){
            return state.course.title;
        }
        return "unavailable";
    }
});

export const courseDescription = selector({
    key: "courseDescriptionState",
    get: ({get}) => {
        const state = get(courseState);
        if(state.course){
            return state.course.description;
        }
        return "unavailable";
    }
});

export const coursePrice = selector({
    key: "coursePriceState", 
    get: ({get}) => {
        const state = get(courseState);
        return state.course.price;
    }
});

export const courseImage = selector({
    key: "courseImageState",
    get: ({get}) => {
        const state = get(courseState);
        return state.course.imageLink;
    }
});

export const coursePublished = selector({
    key: "coursePublishedState", 
    get: ({get}) => {
        const state = get(courseState);
        return state.course.published;
    }
});