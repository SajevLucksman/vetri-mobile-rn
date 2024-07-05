import constants from "../constants";
import FirebaseFireStore from "../firebase-firestore";

export default class User {
    public static saveUser = (key: string, user: {}) => {
        return FirebaseFireStore.addRecord(constants.FIREBASE_FIRESTORE.USER_TABLE, user, key);
    }

    public static getUser = (userId: string) => {
        return FirebaseFireStore.getRecord(constants.FIREBASE_FIRESTORE.USER_TABLE, userId);
    }
}