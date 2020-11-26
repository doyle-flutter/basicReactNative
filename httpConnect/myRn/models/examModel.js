// Example

// (1) componentDidMount
// * RnDocumentsSampleServer : https://reactnative.dev/movies.json
// * DataSet :
// const dumyData = {
//     title: "The Basics - Networking",
//     description: "Your app fetched this from a remote endpoint!",
//     movies: [
//         {
//             id: "1",
//             title: "Star Wars",
//             releaseYear: "1977"
//         },
//         {
//             id: "2",
//             title: "Back to the Future",
//             releaseYear: "1985"
//         },
//         {
//             id: "3",
//             title: "The Matrix",
//             releaseYear: "1999"
//         },
//         {
//             id: "4",
//             title: "Inception",
//             releaseYear: "2010"
//         },
//         {
//             id: "5",
//             title: "Interstellar",
//             releaseYear: "2014"
//         }
//     ]
// }

export class ExamModel{
    constructor(json){
        [this.id, this.title, this.releaseYear] = [json.id, json.title, json.releaseYear];
    }
    static fromJson(json){
        return new ExamModel(json);
    }
}


// (2) constructor
// CreateNodejsServer
// * NodejsServer : http://localhost:3000/data/all
// * DataSet : 
// const dymy = {
//  req: "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36",
//  title: "MyNodeJsServer",
//  data: "MyNodeJsServerData"
// }

export class MyServerDataModel{
    constructor(json){
        [this.client, this.title, this.data] = [json.client, json.title, json.data];
    }
    static fromJson(json){
        return new MyServerDataModel(json);
    }
}
