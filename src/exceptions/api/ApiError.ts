export class ClientError extends Error{
    public constructor(message: string){
	super(message);
	this.name = "ClientError"
	Object.setPrototypeOf(this, new.target.prototype);
    } 
};

export class ServerError extends Error{
    public constructor(message: string){
	super(message);
	this.name = "ServerError";
	Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class NetworkError extends Error{
    public constructor(message: string){
	super(message);
	this.name = "NetworkError";
	Object.setPrototypeOf(this, new.target.prototype);
    }
}
