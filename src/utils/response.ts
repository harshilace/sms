export class ResponseUtil {
    constructor(
        public success: boolean,
        public data: any = null,
        public message: string = '',
    ) { }

    static success(message: string = '', data: any = []) {
        return new ResponseUtil(true, data, message);
    }

    static error(message: string = '', error?: any) {
        return new ResponseUtil(false, null, message);
    }
}
