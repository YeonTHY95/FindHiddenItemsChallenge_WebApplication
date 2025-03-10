var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { http, HttpResponse } from 'msw';
const registeredUsers = [];
export const handler = [
    http.post('http://localhost:3000/mongobe/signup', (_a) => __awaiter(void 0, [_a], void 0, function* ({ request }) {
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
        const result = yield request.text();
        console.log(result);
        const [usernameSection, passwordSection] = result.split('&');
        if (!usernameSection || !passwordSection) {
            return HttpResponse.text("Invalid Request", { status: 400 });
        }
        const username = usernameSection.split('=')[1];
        const password = passwordSection.split('=')[1];
        if (!username || !password) {
            return HttpResponse.text("Invalid Request", { status: 400 });
        }
        if (registeredUsers.find(user => user.username === username)) {
            // Simulate the error response from the Express Validator BackEnd
            return HttpResponse.json({ errors: [{ type: "field", path: "signup_username", msg: "The user name is already used by others !!!" }] }, { status: 400 });
        }
        if (password.length < 3) {
            // Simulate the error response from the Express Validator BackEnd
            return HttpResponse.json({ errors: [{ type: "field", path: "signup_password", msg: "The minimum size of Password must be 3" }] }, { status: 400 });
        }
        registeredUsers.push({ username, password });
        console.log("Status Ok in MSW Handler");
        return HttpResponse.text("OK", { status: 201 });
    }))
];
