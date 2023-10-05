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
        firestore().collection(this.GATHERING_COLLECTION)
          .add({
            name,
            date,
            ownerID: creatorID,
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

    // MARK: - Read
    public async readGatherings(): Promise<Gathering[] | null>{
      return new Promise((resolve, reject) => {
        firestore()
        .collection(this.GATHERING_COLLECTION)
        .get()
        .then(querySnapshot => {
          let gatherings: Gathering[] = [];
          console.log('Total gatherings: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            console.log('Gathering ID: ', documentSnapshot.id, documentSnapshot.data());
            const date = documentSnapshot.data().date.toDate();
            const name = documentSnapshot.data().name;
            const ownerID = documentSnapshot.data().ownerID;
            const gathering: Gathering = {
              id: Utils.generateUUID(),
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

    // MARK: - Private methods
  }
  
export default FirestoreService;
