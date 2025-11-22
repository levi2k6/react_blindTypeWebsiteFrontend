import { Response } from "../interfaces";
import { Api } from "./Api";

export class ApiBuilder {
    private url?: string;
    private headers?: Record<string, string>;
    private credentials?: RequestCredentials;

    
    public setUrl(url: string): ApiBuilder{
	this.url = url;
	return this;
    }

    public setHeaders(headers: Record<string, string>): ApiBuilder{
	this.headers = headers;
	return this;
    }

    public setCredentials(credentials: RequestCredentials): ApiBuilder{
	this.credentials = credentials;
	return this
    }

    public build(): Api | undefined{
	if(!this.url || !this.headers || !this.credentials){
	    console.error("failed to ");
	    return;
	}
	const newApi = new Api(this.url, this.headers, this.credentials);
	return newApi;
    } 



}

export default ApiBuilder;
