export const firebaseErrorMessage = (code) => {
    const errors = {
        "auth/email-already-in-use": "This email is already registered!",
        "auth/invalid-email": "Email is invalid!",
        "auth/weak-password": "Password must be at least 6 characters!",
        "auth/operation-not-allowed": "Google login is not enabled!",
        "auth/popup-closed-by-user": "Popup closed. Try again!",
        "auth/popup-blocked": "Popup blocked by browser!",
        "auth/user-not-found": "User not found!",
        "auth/wrong-password": "Wrong password. Try again!",
        "auth/missing-password": "Password is required!",
    };

    return errors[code] || "Something went wrong. Please try again!";
};
