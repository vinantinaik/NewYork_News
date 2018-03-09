$(document).ready(function () {


    var searchObj ={
		'api-key' : "a6fafa0f676b487eb61ae9b100d08673",
        q:"",
		begin_date:undefined,
		end_date:undefined,
        page : 0,
             
    }



    function getArticles(sObj) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param(sObj);
        $.ajax({
            url: url,
            method: 'GET',
        }).then(function (result) {
            responseHandler(result.response.docs);
     
        });
    }
    $("#searchBtn").on("click",function(e){
      
      e.preventDefault();
      searchObj.q=$("#search").val();
      searchObj.page=$("#numRec").val();    
      searchObj.begin_date=$("#startYear").val(); 
      searchObj.end_date=$("#endYear").val(); 

      if(searchObj.begin_date === undefined || searchObj.begin_date === "")
      {
          delete searchObj.begin_date;
      }

      if(searchObj.end_date === undefined || searchObj.end_date === "")
      {
          delete searchObj.end_date;
      }
      getArticles(searchObj);   
     
    })
	
	
	function responseHandler(articles)
	{
		$("#info").empty();
		$.each(articles,function(key,article){
            var h3Tag = $("<h3>");
            var pTag=$("<p>");
            var aRefTag=$("<a>");
            var hr=$("<hr>")
			h3Tag.addClass("header");
            h3Tag.text(article.headline.main);
            pTag.text(article.snippet);
            aRefTag.attr("href",article.web_url);
            aRefTag.text(article.source);
            $("#info").append(h3Tag,pTag,aRefTag,hr);
            
		});
    }
    

    $('#clearBtn').on('click', function () {
        $('#info').empty();
        $('#search').val('');
        $('#numRec').val('');
        $('#startYear').val('');
        $('#endYear').val('');
    })

    
});
   
