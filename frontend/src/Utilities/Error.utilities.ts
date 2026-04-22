export const errorMessages: Record<number, { title: string; type:string; message: string }> = {
    0: { title:  "Unknown Error", type: "UNKNOWN", message: "Something went wrong!"},
    400: { title: "Bad Request", type: "BAD_REQUEST", message: "Something went wrong with your request." },
    401: { title: "Unauthorized", type: "UNAUTHENTICATED", message: "You need to log in to view this page." },
    403: { title: "Forbidden", type: "UNAUTHORISED", message: "You don’t have permission to access this." },
    404: { title: "Content Not Found", type: "CONTENT_NOT_FOUND", message: "Page not found." },
    500: { title: "Server Error", type: "SERVER_ERROR", message: "Something broke on our end." },
};