import firestore from '@react-native-firebase/firestore';

export default class FirebaseFireStore {
    public static getRecord = (collectionName: string, id: any) => {
        return firestore().collection(collectionName).doc(id).get();
    }

    public static queryRecord = (collectionName: string, queryField: any, operator: any, filterValue: any) => {
        //return firestore().collection(collectionName).doc(id).get();
        return firestore()
            .collection(collectionName)
            // Filter results
            .where(queryField, operator, filterValue)
            .get();
    }

    public static getrecords(collectionName: string) {
        return firestore().collection(collectionName).get();
    }

    public static addRecord = (collectionName: string, data: any, key?: any) => {
        key = key ? key : '';
        return firestore().collection(collectionName).doc(key).set(data);
    }
}