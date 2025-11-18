class ApiService{

    private static instance: ApiService = new ApiService();

    public static getInstance(){
	return this.instance;
    } 

    public async getCurrentUser(){
	try{
	const response = await fetch("http://localhost:8080/api/v1/private/auth0/auth-user", {
	    method: "GET",
	    credentials: "include",
	})

	if(!response.ok){
	    console.error("Not logged in or error: ", response.status);
	    return null;
	}

	const data = await response.json();
	console.log("Current user: ", data)
	return data;
	}catch(error){
	    console.error("Error fetching user: ", error);
	    return null
	}
    }
}

export default ApiService;

