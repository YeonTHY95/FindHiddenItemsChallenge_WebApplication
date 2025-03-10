import { http, HttpResponse } from 'msw' ;

 const registeredUsers:{username : string, password : string}[] = [];

 export const handler = [
    http.post('http://localhost:3000/mongobe/signup', async ({request}) => {

        console.log("Inside signup handler");
        //console.log(request);
        //console.log(`Request body getReader : ${request.body?.getReader()} `);
        // try {
        //     let body = '';
        //     if (request.body) {
        //         const reader = request.body.getReader();
        //         const decoder = new TextDecoder();
        //         const result = await reader.read();
        //         body = decoder.decode(result.value);

        //         console.log(body);
        //     }
        // }
        // catch(err) {
        //     console.log(err);
        // }

        const result = await request.text();
        console.log(result);

        const [ usernameSection, passwordSection ] = result.split('&') ;
        if (!usernameSection || !passwordSection) {
            return HttpResponse.text("Invalid Request", {status: 400});
        }
        const username = usernameSection.split('=')[1];
        const password = passwordSection.split('=')[1];

        if ( !username || !password) {
            return HttpResponse.text("Invalid Request", {status: 400});
        }

        if (registeredUsers.find( user => user.username === username)) {

            // Simulate the error response from the Express Validator BackEnd
            return HttpResponse.json({ errors :  [{ type : "field", path : "signup_username", msg : "The user name is already used by others !!!"}]}, {status: 400});
        }
        
        if (password.length < 3) {
            // Simulate the error response from the Express Validator BackEnd
            return HttpResponse.json({ errors :  [{ type : "field", path : "signup_password", msg : "The minimum size of Password must be 3"}]}, {status: 400});
        }

        registeredUsers.push({username, password});
        
        console.log("Status Ok in MSW Handler");
        return HttpResponse.text("OK", {status : 201});
    })
 ] ;