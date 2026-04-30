export const errorMessages: Record<number, { title: string; type:string; message: string }> = {
    0: { title:  "Unknown Error", type: "UNKNOWN", message: "Something went wrong, and we do not know what happened."},
    400: { title: "Bad Request", type: "BAD_REQUEST", message: "Something went wrong with your request. Try again later!" },
    401: { title: "Unauthorized", type: "UNAUTHENTICATED", message: "You need to be signed in to access this resource." },
    403: { title: "Forbidden", type: "UNAUTHORISED", message: "You don't have permission to access this resource." },
    404: { title: "Content Not Found", type: "CONTENT_NOT_FOUND", message: "The content you are looking for was not found." },
    500: { title: "Server Error", type: "SERVER_ERROR", message: "Oops! Something broke on our end." },
};