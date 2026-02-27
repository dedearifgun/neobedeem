function copyToClipboard(button) {
  var valueToCopy = $(button).data('copy-value')

  navigator.clipboard.writeText(valueToCopy)
    .then(function() {
      $(button).tooltip({
        title: 'Copied',
        trigger: 'manual'
      });
      $(button).tooltip('show');

      // Hide the tooltip after 2 seconds
      setTimeout(function() {
        $(button).tooltip('hide');
      }, 2000);
    })
    .catch(function(error) {
      // Handle error
      console.error('Unable to copy to clipboard:', error);
    });
}