import firestore from '@react-native-firebase/firestore';
import Utils from './utils';

import Gathering from '../model/Gathering';
import User from '../model/User';

class FirestoreService {
  // MARK: - Properties and constructor
    private static instance: FirestoreService | null = null;
    private GATHERING_COLLECTION = 'gatherings';
    private USERS_COLLECTION = 'users';
  
    private constructor() {}
  
    static shared(): FirestoreService {
      if (FirestoreService.instance === null) {
        FirestoreService.instance = new FirestoreService();
      }
      return FirestoreService.instance;
    }
  
    // MARK: - Public methods
    // MARK: - Create
    public createGathering(creatorID: string, name: String, date: Date): Promise<void | string> {
      return new Promise((resolve, reject) => {
        const gatheringID = Utils.generateUUID();
        firestore().collection(this.GATHERING_COLLECTION).doc(gatheringID)
          .set({
            name,
            date,
            ownerID: creatorID,
            id: gatheringID
          })
          .then(() => {
            console.log('Gathering added!');
            resolve();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    }

    public createUser(pseudo: string, email: string, uid: string): Promise<void | string> {
      return new Promise((resolve, reject) => {
        firestore().collection(this.USERS_COLLECTION).doc(uid)
        .set({
          pseudo,
          email,
        })
        .then(() => {
          console.log('User added!');
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
      });
    }

    public async addParticipantToGathering(gatheringID: string, userID: string): Promise<void | string> {
      const peopleUIDs = await this.readParticipantsFromGathering(gatheringID);

      let array: string[] = [];
      if (peopleUIDs !== undefined) {
        array = peopleUIDs as string[];
        if (!peopleUIDs?.includes(userID)) {
          array.push(userID);
        }
      } else {
        array = [userID];
      }

      return new Promise((resolve, reject) => {
        firestore().collection(this.GATHERING_COLLECTION).doc(gatheringID)
          .set({
            peopleUIDs: array,
          }, {merge: true})
          .then(() => {
            console.log('Participant added!');
            resolve();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    }

    // MARK: - Read
    public async readGatherings(): Promise<Gathering[] | null>{
      return new Promise((resolve, reject) => {
        firestore()
        .collection(this.GATHERING_COLLECTION)
        .get()
        .then(querySnapshot => {
          let gatherings: Gathering[] = [];
          querySnapshot.forEach(documentSnapshot => {
            const date = documentSnapshot.data().date.toDate();
            const name = documentSnapshot.data().name;
            const ownerID = documentSnapshot.data().ownerID;
            const id = documentSnapshot.data().id;
            const gathering: Gathering = {
              id,
              date,
              name,
              ownerID,
              peopleUIDs: [],
            }
            gatherings.push(gathering);
          });
          resolve(gatherings);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
      });
    }

    public async retrieveUserFromUID(uid: string): Promise<User | string> {
      return new Promise((resolve, reject) => {
        firestore()
        .collection(this.USERS_COLLECTION)
        .doc(uid)
        .get()
        .then(documentSnapshot => {
          const data = documentSnapshot.data();
          if (data !== undefined) {
            const email = data.email;
            const pseudo = data.pseudo;
            const user: User = {
              uid,
              email,
              pseudo,
              profilePicPath: data.profilePicPath,
            }
            resolve(user);
          } else {
            reject('User not found');
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
      });
    }

    // MARK: - Update

    // MARK: - Delete
    public async removeParticipantFromGathering(gatheringID: string, userID: string): Promise<void | string> {
      const peopleUIDs = await this.readParticipantsFromGathering(gatheringID);
      
      let array: string[] = [];
      if (peopleUIDs !== undefined) {
        array = peopleUIDs as string[];
        if (!peopleUIDs?.includes(userID)) {
          array = array.filter((value) => {
            return value !== userID;
          });
        }
      }

      return new Promise((resolve, reject) => {
        firestore().collection(this.GATHERING_COLLECTION).doc(gatheringID)
          .update({
            peopleUIDs: firestore.FieldValue.arrayRemove(userID),
          })
          .then(() => {
            console.log('Participant removed!');
            resolve();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    }

    // MARK: - Private methods
    private readParticipantsFromGathering(gatheringID: string): Promise<string[] | null> {
      return new Promise((resolve, reject) => {
        firestore()
        .collection(this.GATHERING_COLLECTION)
        .doc(gatheringID)
        .get()
        .then(documentSnapshot => {
          const data = documentSnapshot.data();
          if (data !== undefined) {
            const peopleUIDs = data.peopleUIDs;
            resolve(peopleUIDs);
          } else {
            reject('Gathering not found');
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
      });
    }
}
  
export default FirestoreService;
