  // handle voting tools (using global vars from discussion.html) #todo fix this
  update_voting_section(disqus_identifier, disqus_url);

  $('#vote-up, #vote-down').each(function(){
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
      }
      $.ajax(settings).done(function (response) {
        console.log('success');
      });

      // disable the button to prevent duplicate voting (sort of)
      $vote_button.attr('disabled','disabled');

      // ersatz optimistic UI
      if($vote_button.attr('id') === 'vote-up') {
        $('#vote-up-count').text(parseInt($('#vote-up-count').text())+1);
      }
      else {
        $('#vote-down-count').text(parseInt($('#vote-down-count').text())+1);
      }

    });
  });

  function update_voting_section(disqus_identifier, disqus_url){
    // use attributes on the buttons to hold the data, since there's not another good way
    $('#vote-up, #vote-down').each(function(){
      var $vote_button = $(this);
      $vote_button.attr('data-disqus-identifier', disqus_identifier);
      $vote_button.attr('data-disqus-url', disqus_url);
      $vote_button.removeAttr('disabled');
    });

    // update vote counts
    var $up_count = $('#vote-up-count');
    var $down_count = $('#vote-down-count');
    $.get('https://openbeta-data.usaspending.gov/resource/upgx-d3ur.json?$select=vote,count(vote)&disqus_id='+ disqus_identifier +'&$group=vote')
      .done(function(data){
        // only two rows should ever come back, but they're not keyed by the vote type.
        // todo: find a better way than checking each object.
        data.forEach(function(row, index, arr){
          if(row.vote === '3ge6-jyz5') { $up_count.text(row.count_vote); }
          if(row.vote === 'eah3-dyfb') { $down_count.text(row.count_vote); }
        });
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