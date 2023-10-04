import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

class FirestoreService {
  // MARK: - Properties and constructor
    private static instance: FirestoreService | null = null;
    private static GATHERING_COLLECTION = 'gatherings';
  
    private constructor() {}
  
    static shared(): FirestoreService {
      if (FirestoreService.instance === null) {
        FirestoreService.instance = new FirestoreService();
      }
      return FirestoreService.instance;
    }
  
    // MARK: - Public methods

    // MARK: - Private methods
  }
  
export default FirestoreService;
