$(document).ready(function () {

    $("#searchBtn").on("click", function () {

        let search = $('#search').val();
        let numRec = $('#numRec').val();
        let startYear = $('#startYear').val();
        let endYear = $('#endYear').val();

        if (startYear > endYear) {
            alert('Start year must be lower than end year!');
        }
        if (search === '') {
            alert('You must enter a search term!');
        }
        if (startYear === '' || startYear < 1980) {
            alert('You must enter a start year after 1980!');
        }
        if (endYear === '') {
            alert('You must enter a end year!');
        }

        $('#info').empty();

        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "a6fafa0f676b487eb61ae9b100d08673",
            'q': search,
            'begin_date': startYear + '0101',
            'end_date': endYear + '0101',
            'page': numRec
        });

        $.ajax({
            url: url,
            method: 'GET',
        }).done(function (result) {

            let articles = result.response.docs;
            console.log(result);
            for (let i = 0; i < articles.length; i++) {
                $('#info').append(`
                <div class="article">
                    <h3>${articles[i].headline.main}</h3>
                    <p>${articles[i].snippet}</p>
                    <a href="${articles[i].web_url}" target="_blank">full article</a>
                </div>
                <div class="spacer"></div>
                `);
            }
            $('.article').css({
                'border': '1px solid #428bca',
                'border-radius': '3px',
                'padding': '1rem'
            });
            $('.spacer').css('height','1rem');
            
        }).fail(function (err) {
            throw err;
        });


    });

    $('#clearBtn').on('click', function() {
        $('#info').empty();
        $('#search').val('');
        $('#numRec').val('');
        $('#startYear').val('');
        $('#endYear').val('');
    })
});