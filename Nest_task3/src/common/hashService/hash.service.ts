import { Injectable } from "@nestjs/common";

@Injectable()
export class HashService {
    encodeRecord(obj){
        const jsonString = JSON.stringify(obj);
        const base64String = btoa(jsonString);
        return {content: base64String};
    }
    decodeRecord(base64String){
        const jsonString = atob(base64String);
        const obj = JSON.parse(jsonString);
        return obj;
    }
}