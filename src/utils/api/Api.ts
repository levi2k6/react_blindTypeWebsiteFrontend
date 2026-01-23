import { ClientError, NetworkError, ServerError } from "../../exceptions/api/ApiError";
import type { Response } from "../interfaces";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class Api{

    private url: string;
    private headers: Record<string, string>;
    private credentials: RequestCredentials;

    constructor(url: string, headers: Record<string, string>, credentials: RequestCredentials) {
        this.url = url
        this.headers = headers	
	this.credentials = credentials
    }

    public setUrl(url: string){
	this.url = url;
    } 

    public setHeader(headers: Record<string, string>){
	this.headers = headers;
    }

    public setCredentials(credentials: RequestCredentials){
	this.credentials = credentials;
    } 

    //fetch
    public async request<T>(
        endpoint: string,
        method: HttpMethod,
        body?: any
    ): Promise<Response<T>> {
        const url = `${this.url}${endpoint}`;
	console.log("reqeuest to ", url);

        const options: RequestInit = {
            method: method,
            headers: this.headers,
	    credentials: this.credentials 
        };

        if (body !== undefined) {
            options.body = JSON.stringify(body);
        }

	try{
	    const response = await fetch(url, options);
	    if (response.status >= 500) {
		throw new ServerError(`Server error request failed: ${response.status}`);
	    }
	    return response.json();
	}catch(ex){
	    throw new NetworkError("Network error during api request. The server could not be running ");
	}

    }

    /** Shortcuts */
    public get<T>(endpoint: string): Promise<Response<T>> {
        const data = this.request<T>(endpoint, "GET");
	return data;
    }

    public post<T>(endpoint: string, body: any): Promise<Response<T>> {
        return this.request<T>(endpoint, "POST", body);
    }

    public put<T>(endpoint: string, body: any): Promise<Response<T>> {
        return this.request<T>(endpoint, "PUT", body);
    }

    public patch<T>(endpoint: string, body: any): Promise<Response<T>> {
        return this.request<T>(endpoint, "PATCH", body);
    }

    public delete<T>(endpoint: string): Promise<Response<T>> {
        return this.request<T>(endpoint, "DELETE");
    }
}

export default Api; 
