import constants from "../constants";
import FirebaseFireStore from "../firebase-firestore";

export default class TimeTable {

    public static getTimeTableByDay = (day: string) => {
        return FirebaseFireStore.queryRecord(constants.FIREBASE_FIRESTORE.TIME_TABLE_TABLE, 'day','==', day);
    }

    /* public static getLecturerList = () => {
        return FirebaseFireStore.getrecords(constants.FIREBASE_FIRESTORE.LECTURERS_TABLE);
    } */
}