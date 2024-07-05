import { showMessage, hideMessage } from "react-native-flash-message";

export default class MessageBanner {
  public static showMessage = (message: string, description: string, type: any) => {
    showMessage({
      message: message,
      description: description,
      // "success" (green), "warning" (orange), "danger" (red), "info" (blue) and "default" (gray).
      type: type,
      onPress: () => {
        /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
      },
    });
  }

  public static errorMessages: any = {
    'auth/app-deleted': "",
    'auth/app-not-authorized': "",
    'auth/invalid-user-token': "",
    'auth/network-request-failed': "",
    'auth/operation-not-allowed': "",
    'auth/requires-recent-login': "User's last sign-in time does not meet the security threshold. Please login again.",
    'auth/too-many-requests': 'Requests are blocked from your device due to unusual activity. Please try again later.',
    'auth/user-disabled': "User account has been disabled by an administrator.",
    'auth/user-token-expired': "User's credential has expired. Please sign-in again."
  };

  public static showErrorMessage = (error: any) => {
    // Contruct mages based on the error type.
    // Firebase error code, e.g. auth/invalid-email
    // error.code
    // The firebase module namespace that this error originated from, e.g. 'analytics'
    // error.namespace
    let constructoedErrorMessage = "Unknown error occured.";
    if (error.code && this.errorMessages[error.code]) {
      constructoedErrorMessage = this.errorMessages[error.code];
    } else {
      const messageSegmets = error.message.split(']');
      if (messageSegmets.length > 0) {
        constructoedErrorMessage = messageSegmets[1];
      } else {
        constructoedErrorMessage = error.message;
      }
    }

    showMessage({
      message: error.name,
      description: constructoedErrorMessage,
      // "success" (green), "warning" (orange), "danger" (red), "info" (blue) and "default" (gray).
      type: "danger",
      onPress: () => {
        /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
      },
    });
  }
}