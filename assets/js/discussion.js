// load initial voting data
update_voting_section();
update_number_of_votes();

$('#vote-up, #vote-down').each(function(){
  // hide the focus outline while clicking in chrome
  $(this).mouseup(function() { this.blur(); });

  $(this).click(function(e){
    var $vote_button = $(this); // new this, by the way
    var now = new Date();
    var form = new FormData();
    form.append("disqus_id", $vote_button.attr('data-disqus-identifier'));
    form.append("disqus_url", $vote_button.attr('data-disqus-url'));
    form.append("vote", $vote_button.attr('id') === 'vote-up' ? '3ge6-jyz5' : 'eah3-dyfb'); // 4x4 for up/down options on form
    form.append("vote_time:month", now.getUTCMonth());
    form.append("vote_time:day", now.getUTCDay());
    form.append("vote_time:year", now.getUTCFullYear());
    form.append("vote_time:hour", now.getUTCHours());
    form.append("vote_time:minute", now.getUTCMinutes());
    //form.append("vote_time:pm", "am");

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://openbeta-data.usaspending.gov/views/wiqh-auj7/rows.html?method=createForm&successRedirect=/views/wiqh-auj7",
      "method": "POST",
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    };
    $.ajax(settings).done(function (response) {
      //console.log('success');
    });

    // disable the button to prevent duplicate voting (sort of)
    $vote_button.attr('disabled','disabled');
    $vote_button.addClass('vote-disabled');

    var new_count;

    // ersatz optimistic UI
    if($vote_button.attr('id') === 'vote-up') {
      new_count = parseInt($('#vote-up-count').text().match(/\d+/)) + 1;
      $('#vote-up-count').text(new_count + (new_count === 1 ? ' person likes this' : ' people like this'));
    }
    else {
      new_count = parseInt($('#vote-down-count').text().match(/\d+/)) + 1;
      $('#vote-down-count').text(new_count + (new_count === 1 ? ' person dislikes this' : ' people dislike this'));
    }

  });
});

function update_voting_section(disqus_identifier, disqus_url){
  // (use attributes on the buttons to hold the data, since there's not another good way)

  // if no arguments, get the config data off the element
  if(disqus_identifier === undefined){
    disqus_identifier = $('#vote-up').attr('data-disqus-identifier');
  }
  if(disqus_url === undefined){
    disqus_url = $('#vote-up').attr('data-disqus_url');
  }
  // reset buttons
  $('#vote-up, #vote-down').each(function(){
    var $vote_button = $(this);
    $vote_button.attr('data-disqus-identifier', disqus_identifier);
    $vote_button.attr('data-disqus-url', disqus_url);
    $vote_button.removeAttr('disabled');
    $vote_button.removeClass('vote-disabled');
  });

  // update vote counts
  var $up_count_span = $('#vote-up-count');
  var $down_count_span = $('#vote-down-count');
  $.get('https://openbeta-data.usaspending.gov/resource/upgx-d3ur.json?$select=vote,count(vote)&disqus_id='+ disqus_identifier +'&$group=vote')
    .done(function(data){
      // only two rows should ever come back, but they're not keyed by the vote type, so we normalize it.
      var normalized_data = {};
      data.forEach(function(row, index, arr){
        normalized_data[row.vote] = parseInt(row.count_vote);
      });

      var up_count = normalized_data['3ge6-jyz5'] || 0;
      var down_count = normalized_data['eah3-dyfb'] || 0;

      // update span
      $up_count_span.text(up_count + (up_count === 1 ? ' person likes this' : ' people like this'));
      $down_count_span.text(down_count + (down_count === 1 ? ' person dislikes this' : ' people dislike this'));
    });
}

// Tab handler for disqus, voting
var reset = function (newIdentifier, newUrl) {
  update_voting_section(newIdentifier, newUrl);

  // handle disqus
  DISQUS.reset({
    reload: true,
    config: function () {
      this.page.identifier = newIdentifier;
      this.page.url = newUrl;
    }
  });
};

// get number of total votes and display on all tabs
function update_number_of_votes() {
  // get disqus_id to retrieve votes for
  var disqus_id_query = $('.vote-count').map(function() {
    return 'disqus_id=' + $(this).data('disqus-identifier');
  }).get().join(' or ');

  // retrieve number of votes
  $.get(
    'https://openbeta-data.usaspending.gov/resource/upgx-d3ur.json?' +
    '$select=disqus_id,count(*) as votes&' +
    '$group=disqus_id&' +
    '$where=' + disqus_id_query
  ).done(function(data) {
    // group array by disqus_id to an object
    var votes = {};
    data.forEach(function(row) {
      votes[row.disqus_id] = +row.votes;
    });

    // iterate over vote-count elements to populate
    $('.vote-count').each(function() {
      // if there have been no votes, key would not exist
      // since disqus id is stored in dataset as number, convert to number (remove leading 0's)
      var count = votes[+$(this).data('disqus-identifier')] || 0;

      $(this).html(count + ' ' + ((count === 1) ? 'vote' : 'votes'));
    });

    console.log(votes);
  });
}
