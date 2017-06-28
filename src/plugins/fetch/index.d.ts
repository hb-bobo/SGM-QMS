declare namespace Fetch {
    interface Response {
        body : ReadableStream,
        bodyUsed : boolean,
        headers : Headers,
        ok : boolean,
        redirected : boolean,
        status : number,
        statusText : string,
        type : string,
        url : string,
    }
}