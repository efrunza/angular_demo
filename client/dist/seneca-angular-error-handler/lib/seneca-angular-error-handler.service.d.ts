import { ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
export declare class SenecaAngularErrorHandlerService implements ErrorHandler {
    private injector;
    constructor(injector: Injector);
    handleError(error: Error | HttpErrorResponse): void;
}
