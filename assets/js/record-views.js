// record a view on concepts pages
// Dependency: jQuery, js.cookie

(function($, Cookies) {

  // use page's pathname for a key to store views by, trimming trailing slash(es) if present
  var key = window.location.pathname.replace(/\/+$/, '');

  /**
   * Records a view per location path in a Socrata dataset
   */
  function record_view() {
    var now = new Date();
    var form = new FormData();
    form.append('key', key);
    form.append('timestamp:month', now.getUTCMonth());
    form.append('timestamp:day', now.getUTCDay());
    form.append('timestamp:year', now.getUTCFullYear());
    form.append('timestamp:hour', now.getUTCHours());
    form.append('timestamp:minute', now.getUTCMinutes());

    // try to record a view in dataset; but no need to process success/failure
    $.ajax({
      url: 'https://openbeta-data.usaspending.gov/views/tgrf-x8a2/rows.html?method=createForm&successRedirect=' +
        encodeURIComponent('https://openbeta-data.usaspending.gov/resource/kzd4-upv9.json?$limit=0'),
      type: 'POST',
      data: form,
      contentType: false,
      processData: false
    });
  }

  /**
   * Checks whether we should record a view by detecting presense of a cookie
   */
  function check_cookie() {
    var cookie_key = 'viewed-' + key;

    // if a cookie does not exist (or is expired), it returns undefined
    if (Cookies.get(cookie_key) === undefined) {
      // record a view
      record_view();

      // set cookie to immediate reloads don't record duplicate hits
      // set cookie to expire in 18 hours (0.75 day)
      Cookies.set(cookie_key, true, { expires: 0.75, path: ''});
    }

    // do nothing if a cookie is present
  }

  // execute check when page is loaded
  check_cookie();

})(jQuery, Cookies);
