let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let scoreCardObj = require("./scoreCard");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

request(url,cb);

function cb(error,response,html){
    if(error){
        console.log(error);
    }else if(response.statusCode==404){
        console.log("page not found");
    }else{
        dataExtracter(html);
    }
}
function dataExtracter(html){
    let searchTool=cheerio.load(html);
    let aElem = searchTool('a[data-hover="View All Results"]');

    let link = aElem.attr("href");

    let fullAllMatchPageLink = `https://www.espncricinfo.com${link}`;

    console.log(fullAllMatchPageLink);
    console.log("'''''''''''''''''''''''''''''''''''''");

    request(fullAllMatchPageLink, allMatchcb);
}

function allMatchcb(error,response,html){
    if(error){
        console.log(error);
    }else if(response.statusCode==404){
        console.log("page not found");
    }else{
        getAllScoreCardLink(html);
    }  
}

function getAllScoreCardLink(html){
    let setTool = cheerio.load(html);
    let scorecardArr = setTool("a[data-hover='Scorecard']");
   for(let i=0;i<scorecardArr.length;i++){
       
       let link = setTool(scorecardArr[i]).attr("href");
       let fullAllMatchPageLink = `https://www.espncricinfo.com${link}`;
       console.log(fullAllMatchPageLink);
       scoreCardObj.psm(fullAllMatchPageLink);
   }
   console.log("''''''''''''''''''''''''''''");

}