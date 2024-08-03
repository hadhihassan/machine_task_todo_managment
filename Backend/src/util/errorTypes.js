export class ErrorHandler extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends ErrorHandler {
    constructor(message = "Bad request") {
        super(message, 400);
    }
}

export class ConflictError extends ErrorHandler {
    constructor(message = "Conflict error") {
        super(message, 409);
    }
}

export class InternalServerError extends ErrorHandler {
    constructor(message = "Internal Server Error") {
        super(message, 500);
    }
}

export class AnErrorOccurredError extends ErrorHandler {
    constructor(message = "An error occurred") {
        super(message, 500);
    }
}

export class NotFoundError extends ErrorHandler {
    constructor(message = "Not found") {
        super(message, 404);
    }
}

export class UserNotFoundError extends ErrorHandler {
    constructor(message = "User not found") {
        super(message, 404);
    }
}

export class ProjectNotFoundError extends ErrorHandler {
    constructor(message = "Project not found") {
        super(message, 404);
    }
}

export class UnauthorizedError extends ErrorHandler {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

export class UserUnauthorizedError extends ErrorHandler {
    constructor(message = "User not Unauthorized") {
        super(message, 401);
    }
}

export class ProjectUnauthorizedError extends ErrorHandler {
    constructor(message = "Project not Unauthorized") {
        super(message, 401);
    }
}