var doc = {
  inlineCSS: 0,

  /* ---
   * FUNCTION: init()
   *    Initialization function that sets up all event handlers.
   */

  init: function() {
    var _this = this;

    $('#code').on('input propertychange paste', function() {
      _this.generate();
    })

    $('#copy').click(function(e) { 
      _this.copy(e); 
    });

    $('#clear').click(function(e) { 
      _this.clear(e); 
    });

    $('#options a').click(function(e) { 
      _this.paste(e, this); 
    });

    $('.play-form .dropdown-toggle').click(function(e) {
      _this.updateDocumentation($(this).attr('data-docid'));
    });
  },


  /* ---
   * FUNCTION: generate()
   *    When the code form is submitted by the user, copy any code in the field to
   *    the output block so that the user can see what that code will look like.
   */
  generate: function() {
    var code = $('#code').val();

    this.cleanCode(code);
    $('#output').html(code);
  },


  /* ---
   * FUNCTION: cleanCode()
   *    Checks to make sure inputted code is OK (free of script tags).
   */
  cleanCode: function(code) {
    var errors = [];

    // Check for inline JS.
    if (code.indexOf('<script') > -1) {
      var goodCodeStart = code.split('<script')[0] || '',
          goodCodeEnd   = code.split('</script>')[1] || '';

      this.updateCode(goodCodeStart + goodCodeEnd);
      errors.push('#error-js');
    }

    // Check for inline CSS.
    if (code.indexOf('style=') > -1) {
      this.inlineCSS++;

      if (this.inlineCSS > 2) {
        errors.push('#error-css-bad');
      } else {
        errors.push('#error-css');
      }
    }

    // Display errors if there are any.
    this.showErrors(errors);
  },


  /* ---
   * FUNCTION: showErrors()
   *    Utility function that displays error modal if there are errors.
   */
  showErrors: function(errors) {
    $('#error section').hide();

    if (errors.length) {
      errors.forEach(function(el) {
        $(el).show(); 
      });

      $('#error').modal('show');
    }
  },


  /* ---
   * FUNCTION: updateCode()
   *    Utility function that updates the inputted code and regenerates output.
   */
  updateCode: function(newCode) {
    $('#code').val(newCode.trim());
    this.generate();
  },


  /* ---
   * FUNCTION: copy()
   *    When a user clicks on the copy button, the contents of the field are
   *    copied to the clipboard.
   */
  copy: function(e) {
    e.preventDefault();
    $('#code').select();
    document.execCommand('copy');
    document.getSelection().removeAllRanges();
  },


  /* ---
   * FUNCTION: clear()
   *    When a user clicks on the "start over" button, the contents of the field deleted
   */
  clear: function(e) {
    e.preventDefault();
    this.updateCode('');
    this.updateDocumentation('default');
  },


  /* ---
   * FUNCTION: paste()
   *    When a user clicks on a code option, the HTML associated with that option
   *    is pasted into the field.
   */
  paste: function(e, el) {
    e.preventDefault();
    var id = $(el).attr('data-option');
    var html = $('#' + id).html();
    var currentCode = $('#code').val();

    this.updateCode(currentCode + html);

    // For certain cases, 
    switch(id) {
      case 'snippets-expandable':
        initExpandableContent();
        break;
      case 'snippets-filterable':
        initFilterableLists();
        break;
      default:
        break;
    }
  },


  /* ---
   * FUNCTION: updateDocumentation()
   *    Display documentation in the sidebar, based on a passed-in ID.
   */
  updateDocumentation: function(id) {
    $('.play-docs section').hide();
    $('.play-docs section[data-doc=' + id + ']').show();
  }
};


$(document).ready(function() {
  doc.init();
});
