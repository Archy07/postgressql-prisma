export type ErrorResponse = {
    status: 'error';
    error: Error;
};
export type SuccessResponse<T> = {
    status: 'success';
    data: T;
};
export type GenericResponse<T> = SuccessResponse<T> | ErrorResponse;