import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

class AuthService {
  // MARK: - Properties and constructor
    private static instance: AuthService | null = null;
  
    private constructor() {}
  
    static shared(): AuthService {
      if (AuthService.instance === null) {
        AuthService.instance = new AuthService();
      }
      return AuthService.instance;
    }
  
    // MARK: - Public methods
    login(email: string, password: string): Promise<boolean | string> {      
      return new Promise((resolve, reject) => {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log('User account created & signed in!');
            resolve(true);
          })
          .catch(error => {
            console.error(error);
            const errorMessage = this.getErrorMessage(error.code);
            reject(errorMessage);
          });
      });
    }
  
    logout(): Promise<void | string> {
      return new Promise((resolve, reject) => {
        auth()
          .signOut()
          .then(() => {
            console.log('User account created & signed in!');
            resolve();
          })
          .catch(error => {
            console.error(error);
            const errorMessage = this.getErrorMessage(error.code);
            reject(errorMessage);
          });
      });
    }

    signUp(email: string, password: string): Promise<boolean | string> {
      return new Promise((resolve, reject) => {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            console.log('User account created & signed in!');
            resolve(true);
          })
          .catch(error => {
            console.error(error);
            const errorMessage = this.getErrorMessage(error.code);
            reject(errorMessage);
          });
      });
    } 
  
    isAuthenticated(): boolean {
      // Implement a method to check if the user is authenticated
      // For example, check if the user has a valid session or token
      return true; // Replace with your actual authentication check
    }

    currentUser(): FirebaseAuthTypes.User | null {
      return auth().currentUser;
    }

    // MARK: - Private methods
    private getErrorMessage(errorCode: string): string {
      var errorMessage = '';
      switch (errorCode) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address format.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'User not found.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Wrong password.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'User is disabled.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'User not found.';
          break;
        default:
          errorMessage = 'Something went wrong. Try again later.';
          break;
      }

      return errorMessage;
    }
  }
  
export default AuthService;
