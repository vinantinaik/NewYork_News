$(document).ready(function () {

    var searchObj ={
        searchTerm:"",
        numRecds : 0,
        startYear:0,
        endYear:0
    }



    function getArticles() {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': 'a6fafa0f676b487eb61ae9b100d08673'
        });
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function (result) {
            console.log(result);
        }).fail(function (err) {
            throw err;
        });
    }

})