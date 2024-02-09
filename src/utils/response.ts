export function successResponse(message: string = '', data: any = []) {
    return {
        success: true,
        data,
        message,
    };
}

export function errorResponse(message: string = '', error?: any) {
    return {
        success: false,
        data: null,
        message,
        error,
    };
}