import firestore from '@react-native-firebase/firestore';

class FirestoreService {
  // MARK: - Properties and constructor
    private static instance: FirestoreService | null = null;
    private GATHERING_COLLECTION = 'gatherings';
  
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
        firestore().collection(this.GATHERING_COLLECTION).doc(creatorID)
          .set({
            name,
            date
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

    // MARK: - Read
    public async readGatherings() {
      firestore()
        .collection(this.GATHERING_COLLECTION)
        .get()
        .then(querySnapshot => {
          console.log('Total gatherings: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            console.log('Gathering ID: ', documentSnapshot.id, documentSnapshot.data());
          });
        });
    }

    // MARK: - Update

    // MARK: - Delete

    // MARK: - Private methods
  }
  
export default FirestoreService;
