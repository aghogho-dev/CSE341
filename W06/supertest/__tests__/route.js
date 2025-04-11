import { hello, index } from "../routes/default.js";

describe("Test Handlers", () => {

    test("responds to /", () => {
        const req = { };

        const res = {
            text: '',
            send: function(input) { this.text = input }

            };

            index(req, res);

            expect(res.text).toBe("Hello World!");
    });

    test("responds to /hello/:name", () => {
        const req = { params: { name: "Bob" } };

        const res = { 
            text: '',
            send: function(input) { this.text = input }
        };

        hello(req, res);

        expect(res.text).toBe("Hello Bob!");
    });
});