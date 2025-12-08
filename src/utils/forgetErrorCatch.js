import toast from "react-hot-toast";

const forgetErrorCatch = (errorCode) => {
    switch (errorCode) {
        case "auth/invalid-email":
            toast.error("Invalid email address format!");
            break;
        case "auth/user-not-found":
            toast.error("No user found with this email!");
            break;
        case "auth/missing-email":
            toast.error("Please enter your email address!");
            break;
        case "auth/too-many-requests":
            toast.error("Too many requests. Please try again later!");
            break;
        default:
            toast.error("Something went wrong. Please try again!");
            break;
    }
}

export default forgetErrorCatch;