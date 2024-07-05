import constants from "../constants";
import FirebaseFireStore from "../firebase-firestore";

export default class Lecturer {

    public static getLecturer = (lecturerId: string) => {
        return FirebaseFireStore.getRecord(constants.FIREBASE_FIRESTORE.LECTURERS_TABLE, lecturerId);
    }

    public static getLecturerList = () => {
        return FirebaseFireStore.getrecords(constants.FIREBASE_FIRESTORE.LECTURERS_TABLE);
    }
}