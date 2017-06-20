import request = require('superagent');
import cookie = require('set-cookie-parser');

export interface Options {
    url: string;
    tenantId: string;
    username: string;
    password: string;
}

export class Login {

    private cookie: string;

    constructor(private options: Options) {
    }

    login(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.cookie) {
                resolve(this.cookie);
            } else {
                request.get(`${this.options.url}/api/login/v1/basicauth`)
                    .set("x-ibm-dx-tenant-id", this.options.tenantId)
                    .timeout(40000)
                    .auth(this.options.username, this.options.password)
                    .end((err, res) => {
                        if (err && !err.status) {
                            reject(new Error("Request completed with error:\n" + err));
                        } else {
                            const responseBody = res.type === "text/html" ? res.text : JSON.stringify(res.body);
                            console.log("ResponseBody", responseBody);

                            // We set the cookies returned from the logon in all future requests. They are set in the right format.
                            const cookies = cookie.parse(res);
                            let loginInfo = "";
                            for (let cookie of cookies) {
                                loginInfo = loginInfo + cookie.name + "=" + cookie.value + ";";
                            }
                            this.cookie = loginInfo;
                            resolve(loginInfo);
                        }
                    });
            }
        });
    }
}
